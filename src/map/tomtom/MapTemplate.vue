<template>
    <div id="map" class="w-full h-screen"></div>
  </template>
  
  <script>
  import { defineComponent, onMounted, ref } from "vue";
  import { Deck } from "@deck.gl/core";
  import { PathLayer } from "@deck.gl/layers";
  import { MapView } from "@deck.gl/core";
  import mapboxgl from "mapbox-gl";
  import "mapbox-gl/dist/mapbox-gl.css";
  
  export default defineComponent({
    setup() {
      const mapRef = ref(null);
  
      const routeData = {
        routePathPoints: [
          { latitude: 3.0128861026549743, longitude: 101.5373634537886 },
          { latitude: 2.964137956543894, longitude: 101.54954196522527 },
        ],
        detailedSegments: [
          {
            shape: [
              { latitude: 3.0129, longitude: 101.53738 },
              { latitude: 3.01247, longitude: 101.5377 },
            ],
          },
          {
            shape: [
              { latitude: 3.01247, longitude: 101.5377 },
              { latitude: 3.01168, longitude: 101.5383 },
            ],
          },
          {
            shape: [
              { latitude: 3.01168, longitude: 101.5383 },
              { latitude: 3.01097, longitude: 101.53883 },
            ],
          },
          {
            shape: [
              { latitude: 3.01097, longitude: 101.53883 },
              { latitude: 3.01021, longitude: 101.53941 },
            ],
          },
          {
            shape: [
              { latitude: 3.01021, longitude: 101.53941 },
              { latitude: 3.00979, longitude: 101.53972 },
            ],
          },
          {
            shape: [
              { latitude: 3.00979, longitude: 101.53972 },
              { latitude: 3.00938, longitude: 101.54003 },
            ],
          },
          {
            shape: [
              { latitude: 3.00938, longitude: 101.54003 },
              { latitude: 3.0087, longitude: 101.54047 },
            ],
          },
          {
            shape: [
              { latitude: 3.0087, longitude: 101.54047 },
              { latitude: 3.00767, longitude: 101.54092 },
            ],
          },
          {
            shape: [
              { latitude: 3.00767, longitude: 101.54092 },
              { latitude: 3.00676, longitude: 101.54129 },
            ],
          },
          {
            shape: [
              { latitude: 3.00676, longitude: 101.54129 },
              { latitude: 3.00443, longitude: 101.5422 },
            ],
          },
          {
            shape: [
              { latitude: 3.00443, longitude: 101.5422 },
              { latitude: 3.00346, longitude: 101.54264 },
            ],
          },
          {
            shape: [
              { latitude: 3.00346, longitude: 101.54264 },
              { latitude: 3.00308, longitude: 101.54304 },
            ],
          },
          {
            shape: [
              { latitude: 3.00308, longitude: 101.54304 },
              { latitude: 3.00246, longitude: 101.54342 },
            ],
          },
          {
            shape: [
              { latitude: 3.00246, longitude: 101.54342 },
              { latitude: 3.00183, longitude: 101.54364 },
            ],
          },
          {
            shape: [
              { latitude: 3.00183, longitude: 101.54364 },
              { latitude: 2.99902, longitude: 101.54537 },
            ],
          },
          {
            shape: [
              { latitude: 2.99902, longitude: 101.54537 },
              { latitude: 2.99748, longitude: 101.54609 },
            ],
          },
          {
            shape: [
              { latitude: 2.99748, longitude: 101.54609 },
              { latitude: 2.99542, longitude: 101.54661 },
            ],
          },
          {
            shape: [
              { latitude: 2.99542, longitude: 101.54661 },
              { latitude: 2.99414, longitude: 101.54664 },
            ],
          },
          {
            shape: [
              { latitude: 2.99414, longitude: 101.54664 },
              { latitude: 2.99229, longitude: 101.5464 },
            ],
          },
          {
            shape: [
              { latitude: 2.99229, longitude: 101.5464 },
              { latitude: 2.99099, longitude: 101.54602 },
            ],
          },
          {
            shape: [
              { latitude: 2.99099, longitude: 101.54602 },
              { latitude: 2.9901, longitude: 101.54595 },
            ],
          },
          {
            shape: [
              { latitude: 2.9901, longitude: 101.54595 },
              { latitude: 2.98814, longitude: 101.54444 },
            ],
          },
          {
            shape: [
              { latitude: 2.98814, longitude: 101.54444 },
              { latitude: 2.9862, longitude: 101.54334 },
            ],
          },
          {
            shape: [
              { latitude: 2.9862, longitude: 101.54334 },
              { latitude: 2.98514, longitude: 101.54293 },
            ],
          },
          {
            shape: [
              { latitude: 2.98514, longitude: 101.54293 },
              { latitude: 2.964137956543894, longitude: 101.54954196522527 },
            ],
          },
        ],
      };
  
      const getPaths = () => {
        return routeData.detailedSegments.map((segment) =>
          segment.shape.map((point) => [point.longitude, point.latitude])
        );
      };
      const getPathColors = () => {
        const paths = getPaths();
        const totalSegments = paths.length;
        return paths.map((path, index) => {
          const ratio = index / (totalSegments - 1);
          return [
            255 * ratio, // Red increases
            255 * (1 - ratio), // Green decreases
            0, // Blue stays at 0
          ];
        });
      };
  
      const getPathsWithColors = () => {
        const paths = getPaths();
        const totalSegments = paths.length;
        return paths.map((path, index) => {
          const ratio = index / (totalSegments - 1);
          return {
            path: path,
            color: [
              Math.floor(255 * ratio), // Red increases
              Math.floor(255 * (1 - ratio)), // Green decreases
              0, // Blue stays at 0
            ],
          };
        });
      };
  
      onMounted(() => {
        // Initialize Mapbox
        mapboxgl.accessToken =
          "pk.eyJ1IjoibmFxd2FsIiwiYSI6ImNscjRnNHg1ZTFtdWwyaXJ5d2pwYXh4a3UifQ.B4zc2JBs8gWuIaujj1aC2w";
        const map = new mapboxgl.Map({
          container: "map",
          // style: 'mapbox://styles/mapbox/streets-v11',
          style: "mapbox://styles/mapbox/dark-v11",
          center: [101.5373634537886, 3.0128861026549743],
          zoom: 12,
        });
  
        // Initialize deck.gl after the map has loaded
        map.on("load", () => {
          const deck = new Deck({
            canvas: "deck-canvas",
            width: "100%",
            height: "100%",
            initialViewState: {
              longitude: 101.5373634537886,
              latitude: 3.0128861026549743,
              zoom: 12,
              pitch: 0,
              bearing: 0,
            },
            controller: true,
            layers: [
              new PathLayer({
                id: "path-layer",
                data: getPathsWithColors(),
                pickable: true,
                widthScale: 20,
                widthMinPixels: 2,
                getPath: (d) => d,
                getColor: d => d.color,
                getWidth: 5,
              }),
            ],
            views: new MapView({ repeat: true }),
            onViewStateChange: ({ viewState }) => {
              map.jumpTo({
                center: [viewState.longitude, viewState.latitude],
                zoom: viewState.zoom,
                bearing: viewState.bearing,
                pitch: viewState.pitch,
              });
            },
          });
  
          mapRef.value = deck;
        });
      });
  
      return {
        mapRef,
      };
    },
  });
  </script>
  
  <style scoped>
  #map {
    position: relative;
    width: 100%;
    height: 100vh;
  }
  #deck-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
  </style>
  