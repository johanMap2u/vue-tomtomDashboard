<template>
  <div >
    <!-- <div class="absolute z-10 w-full">
      <div class="text-2xl bg-white flex w-full text-red-600">
        <p>Johan Map</p>
      </div>
    </div> -->
    <!-- <div class="absolute z-10 opacity-35 bottom-0 bg-white p-4 text-center">
      <p class="text-lg text-gray-600">This is the Demo</p>
    </div> -->
    <div class="absolute z-10 bottom-0  text-center w-full">
      <button @click="loadIndonesiaData" class="bg-blue-500 text-white px-4 py-2">Indonesia</button>
      <button @click="loadTomTomData" class="bg-green-500 text-white px-4 py-2 ml-2">lebuhraya shah alam- guthrie</button>
      <button @click="loadBentongData" class="bg-red-300 text-white px-4 py-2 ml-2">Pekan Bentong</button>

      <p class="text-lg text-gray-600 mt-2">This is Johan Demo</p>
    </div>
    <MapTomTom :basemap="currentBaseMap" :routeData="currentRouteData"/>
  </div>
</template>

<script>
import { defineComponent,ref } from "vue";
import MapTomTom from "./map/tomtom/MapTemplateLine.vue";
import indonesiaData from "./map/tomtom/IndonesiaData.json";
import tomtomData from "./map/tomtom/tomtomdata.json";
import bentongData from "./map/tomtom/PekanBentong.json";

import "mapbox-gl/dist/mapbox-gl.css";

export default defineComponent({
  components: { MapTomTom },
  setup() {
    const currentRouteData = ref(tomtomData); // Default to TomTom data
    // const currentBaseMap = ref('mapbox://styles/naqwal/cluc1135h005j01qq22febwjl')
    // const currentBaseMap = ref('mapbox://styles/naqwal/cluaoa6te00ag01r53d1z1zi6')
    const currentBaseMap = ref('mapbox://styles/mapbox/dark-v11')

    const loadIndonesiaData = () => {
      currentRouteData.value = indonesiaData;
    };

    const loadTomTomData = () => {
      currentRouteData.value = tomtomData;
    };
    const loadBentongData = () => {
      currentRouteData.value = bentongData;
    };
    return {
      currentRouteData,
      currentBaseMap,
      loadBentongData,
      loadIndonesiaData,
      loadTomTomData,
    };
  },
});
</script>

<style lang="scss" scoped></style>
