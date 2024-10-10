<template>
  <div id="map" class="w-full h-screen"></div>
  <div v-if="hoveredObject" id="hover-box" :style="hoverBoxStyle">
    <p><strong>Average Speed:</strong> {{ hoveredObject.averageSpeed }} km/h</p>
    <p><strong>Current Speed:</strong> {{ hoveredObject.currentSpeed }} km/h</p>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, reactive, watch } from "vue";
import mapboxgl from "mapbox-gl";
import { MapboxOverlay } from "@deck.gl/mapbox";
import { FlyToInterpolator } from "deck.gl"; // Import the FlyToInterpolator
import RouteLayers from "./layer/RouteLayer.js";
import RoutePoint from "./layer/IconLayer.js";
import { LinearInterpolator } from "@deck.gl/core";

export default defineComponent({
  props: {
    routeData: Object,
    basemap: String,
    zoom: Number,
  },
  setup(props, { emit }) {
    const mapRef = ref(null);
    const hoveredObject = ref(null);
    const activeLayerIds = ref([]);

    const hoverBoxStyle = reactive({
      position: "absolute",
      zIndex: 1,
      pointerEvents: "none",
      backgroundColor: "white",
      padding: "15px",
      borderRadius: "5px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
      maxWidth: "300px",
      fontFamily: "Arial, sans-serif",
    });

    const getPathData = () => {
      // console.log('delay time:',props.routeData.delayTime)
      return props.routeData.detailedSegments.map((segment) => ({
        path: segment.shape.map((point) => [point.longitude, point.latitude]),
        averageSpeed: segment.averageSpeed,
        currentSpeed: segment.currentSpeed,
      }));
    };

    const getStartEndPoints = () => {
      return [
        {
          position: [
            props.routeData.routePathPoints[0].longitude,
            props.routeData.routePathPoints[0].latitude,
          ],
          color: [0, 255, 0],
        },
        {
          position: [
            props.routeData.routePathPoints[
              props.routeData.routePathPoints.length - 1
            ].longitude,
            props.routeData.routePathPoints[
              props.routeData.routePathPoints.length - 1
            ].latitude,
          ],
          color: [255, 0, 0],
        },
      ];
    };

    const onHover = (info) => {
      hoveredObject.value = info.object;
      if (info.object) {
        Object.assign(hoverBoxStyle, {
          left: `${info.x + 10}px`,
          top: `${info.y + 10}px`,
          zIndex: "10",
        });
      }
    };
    const getColor = (averageSpeed, currentSpeed) => {
      //   const ratio = currentSpeed / averageSpeed;
      if (currentSpeed >= 60) return [0, 255, 0];
      if (currentSpeed >= 30) return [255, 255, 0];
      //   if (ratio >= 1) return [0, 255, 0]; // Green
      //   if (ratio >= 0.7) return [255, 255, 0]; // Yellow
      return [255, 0, 0]; // Red
    };

    const renderMapLayers = () => {
      const map = mapRef.value;
      const pathData = getPathData();
      const routeLayerId = "tomtom-layer";
      const iconLayerId = "start-end-icons";
      const layers = [
        new RouteLayers({
          id: routeLayerId,
          data: pathData,
          getColor: getColor,
          getWidth: 5,
          onHover: onHover,
        }),
        new RoutePoint({
          id: iconLayerId,
          data: getStartEndPoints(),
        }),
      ];

      const overlay = new MapboxOverlay({
        layers: layers,
      });

      map.addControl(overlay);

      activeLayerIds.value = [routeLayerId, iconLayerId];
    };

    const transitionToNewView = () => {
      const map = mapRef.value;
      map.flyTo({
        center: [
          props.routeData.routePathPoints[0].longitude,
          props.routeData.routePathPoints[0].latitude,
        ],
        zoom: 12,
        pitch: 55,
        bearing: 8,
        speed: 2,
        transitionDuration: 3000,
        transitionInterpolator: new FlyToInterpolator({ speed: 2 }),
      });
    };

    const removeCurrentLayers = () => {
      const map = mapRef.value;
      activeLayerIds.value.forEach((layerId) => {
        if (map.getLayer(layerId)) {
          map.removeLayer(layerId);
        }
        if (map.getSource(layerId)) {
          map.removeSource(layerId);
        }
      });
      activeLayerIds.value = [];
    };

    onMounted(() => {
      mapboxgl.accessToken =
        "pk.eyJ1IjoibmFxd2FsIiwiYSI6ImNscjRnNHg1ZTFtdWwyaXJ5d2pwYXh4a3UifQ.B4zc2JBs8gWuIaujj1aC2w"; // Replace with your Mapbox token
      const map = new mapboxgl.Map({
        container: "map",
        style: props.basemap,
        center: [
          props.routeData.routePathPoints[0].longitude,
          props.routeData.routePathPoints[0].latitude,
        ],
        zoom: 12,
        pitch: 55,
        bearing: 8,
      });

      mapRef.value = map;

      map.on("load", () => {
        renderMapLayers();
      });

      map.on("move", () => {
        // console.log('map move',map.getZoom().toFixed(0))
        // console.log("map move", getScale(map.getZoom()));
        emit("distance-km", getScale(map.getZoom()));
      });
      emit("current-zoom", Math.round(map.getZoom()));
    });

    const getScale = (zoom) => {
      if (mapRef.value) {
        const distancePerPixelAtEquator = 156543.03 / Math.pow(2, zoom);
        const mapWidthInPixels = mapRef.value.getContainer().clientWidth;
        const km = (distancePerPixelAtEquator * mapWidthInPixels) / 1000;
        // console.log('Distance zoom:',km.toFixed(0))
        return km.toFixed(0)
      }

      return 0;
    };

    watch(
      () => props.routeData,
      () => {
        removeCurrentLayers();
        transitionToNewView();
        renderMapLayers();
      }
    );

    watch(
      () => props.zoom,
      (newZoom) => {
        if (mapRef.value) {
          // console.log('zoom current:',mapRef.value.getZoom())
          // const level = mapRef.value.getZoom() + newZoom
          mapRef.value.zoomTo(newZoom);
          getScale(newZoom);
          emit("current-zoom", newZoom);
        }
      }
    );

    watch(
      () => props.basemap,
      (value) => {
        if (mapRef.value) {
          mapRef.value.setStyle(value);
        }
      }
    );

    watch(
      () => mapRef.value,
      (value) => {
        console.log("Map move:", value);
      }
    );

    return {
      mapRef,
      hoveredObject,
      getScale,
      hoverBoxStyle,
    };
  },
});
</script>

<style scoped>
#map {
  width: 100%;
  height: 100vh;
}
</style>
