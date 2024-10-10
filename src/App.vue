<template>
  <div>
    <div class="absolute z-10 bottom-0 text-center w-full">
      <button
        @click="loadIndonesiaData"
        class="bg-blue-500 text-white px-4 py-2"
      >
        Indonesia
      </button>
      <button
        @click="loadTomTomData"
        class="bg-green-500 text-white px-4 py-2 ml-2"
      >
        lebuhraya shah alam- guthrie
      </button>
      <button
        @click="loadBentongData"
        class="bg-red-300 text-white px-4 py-2 ml-2"
      >
        Pekan Bentong
      </button>

      <p class="text-lg text-gray-600 mt-2">This is Johan Demo</p>
    </div>
    <div class="absolute z-10 text-white right-0">
      <ZoomMap :level="currentZoom" @increase-zoom="increaseZoom" @decrease-zoom="decreaseZoom" />
    </div>
    <div class="absolute z-10 text-white bottom-9 right-0">
      <ToolkitMenu>
          <div class="mx-2  bg-black">
            <BaseMap @selected-basemap="basemapChange"/>
          </div>
      </ToolkitMenu>
    </div>
    <MapTomTom
      @current-zoom="mapZoom"
      :basemap="currentBaseMap"
      :routeData="currentRouteData"
      :zoom="currentZoom"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import MapTomTom from "./map/tomtom/MapTemplateLine.vue";
import indonesiaData from "./map/tomtom/data/IndonesiaData.json";
import tomtomData from "./map/tomtom/data/tomtomdata.json";
import bentongData from "./map/tomtom/data/PekanBentong.json";
import ToolkitMenu from "./components/side-menu/ToolkitMenu.vue";
import ZoomMap from "./components/map-utility/ZoomMap.vue";
import BaseMap from "./components/map-utility/BaseMap.vue";

import "mapbox-gl/dist/mapbox-gl.css";

export default defineComponent({
  components: { MapTomTom, ToolkitMenu, ZoomMap,BaseMap },
  setup() {
    const currentRouteData = ref(tomtomData);
    const zoomLevel = ref(12);
    const currentZoom = ref(0);
    // const currentBaseMap = ref('mapbox://styles/naqwal/cluc1135h005j01qq22febwjl')
    // const currentBaseMap = ref('mapbox://styles/naqwal/cluaoa6te00ag01r53d1z1zi6')
    const currentBaseMap = ref("mapbox://styles/mapbox/dark-v11");

    const loadIndonesiaData = () => {
      currentRouteData.value = indonesiaData;
    };

    const loadTomTomData = () => {
      currentRouteData.value = tomtomData;
    };
    const loadBentongData = () => {
      currentRouteData.value = bentongData;
    };

    const mapZoom = (value) => {
      currentZoom.value = value;
    };

    const increaseZoom = () => {
      currentZoom.value += 1;
    };
    const decreaseZoom = () => {
      currentZoom.value -= 1;
    };

    const basemapChange = (map) => {
      currentBaseMap.value = map
    };

    return {
      currentRouteData,
      currentBaseMap,
      loadBentongData,
      loadIndonesiaData,
      loadTomTomData,
      zoomLevel,
      currentZoom,
      increaseZoom,
      mapZoom,
      basemapChange,
      decreaseZoom,
    };
  },
});
</script>

<style lang="scss" scoped></style>
