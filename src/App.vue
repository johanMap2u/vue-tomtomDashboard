<template>
  <div>
    
    <div class="absolute z-10 w-full text-white">
      <!-- zoom control -->
      <p class="text-sm px-14 text-slate-500">This is the Demo</p>
      <div class="flex w-full p-2">
        <div class="border-2 rounded-full" @click="increaseZoom">
          <div
            class="hover:bg-slate-500 hover:rounded-full size-8 flex items-center justify-center"
          >
            <button class="pb-1">+</button>
          </div>
        </div>
        <div class="px-3 py-1">Zoom Level : {{ currentZoom }}</div>
        <div class="border-2 rounded-full" @click="decreaseZoom">
          <div
            class="hover:bg-slate-500 hover:rounded-full size-8 flex items-center justify-center"
          >
            <button class="pb-1">-</button>
          </div>
        </div>
      </div>

      <!-- //basemap -->
      <div class=" flex p-2 gap-1">
        <div
            class="px-2 bg-green-500"
            @click="basemapChange('dark')"
          >
            <button class="pb-1">BaseMap Dark</button>
          </div>
          <div
            class="px-2 bg-blue-500"
            @click="basemapChange('darks')"
          >
            <button class="pb-1">basemap 2</button>
          </div>
      </div>

    </div>




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
import indonesiaData from "./map/tomtom/IndonesiaData.json";
import tomtomData from "./map/tomtom/tomtomdata.json";
import bentongData from "./map/tomtom/PekanBentong.json";

import "mapbox-gl/dist/mapbox-gl.css";

export default defineComponent({
  components: { MapTomTom },
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

    const basemapChange = (map)=>{
      if(map === 'dark'){
        console.log('basemap:dark',map)
        currentBaseMap.value = 'mapbox://styles/mapbox/dark-v11'
      }else {
        console.log('basemap:light')
        currentBaseMap.value = 'mapbox://styles/naqwal/cluc1135h005j01qq22febwjl'
      }
    }

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
