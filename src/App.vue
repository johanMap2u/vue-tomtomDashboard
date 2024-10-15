<template>
  <div>
    <!-- <div class="absolute z-10 bottom-10 text-center w-full">
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
    </div> -->
    <div class="absolute z-10 text-white p-2 bottom-8">
      <div class="flex gap-2">
        <DisplayData :TomtomData="`${zoomDistance} km`" />
        <DisplayData :TomtomData="`Delay time: ${delayTime}`" />
        <DisplayData :TomtomData="`Travel time: ${travelTimeTom}`" />
        <div class="text-xs border-2 border-slate-500 px-4 py-1 rounded-lg flex gap-1">
          <v-icon name="bi-arrow-counterclockwise" />
          <p>{{countdown}}</p>
        </div>
      </div>
    </div>

    <div v-if="information" class="absolute z-10 text-white p-2 top-20 pl-16">
      <MdCard  />
    </div>

    <div class="absolute z-10 text-white bottom-64 right-0">
      <ZoomMap
        :level="currentZoom"
        @increase-zoom="increaseZoom"
        @decrease-zoom="decreaseZoom"
      />
    </div>
    <div class="absolute z-10 text-white bottom-9 right-0">
      <ToolkitMenu @info-toggle="infoToggle">
        <div class="mx-2 mt-16 bg-black">
          <BaseMap @selected-basemap="basemapChange" />
        </div>
        <template #route-selected>
          <div>
            <!-- Dynamic Route List -->
            <div class="text-white bg-black border-2 border-slate-600 shadow">
              <ul role="list" class="divide-y divide-slate-600">
                <li
                  v-for="(route, index) in routeDetail"
                  :key="index"
                  class="px-1 py-1 hover:text-slate-500 cursor-pointer"
                  @click="selectRoute(route)"
                >
                  <div class="flex justify-between">
                    <p>{{ route.route }}</p>
                    <p>{{ route.km }} km</p>
                  </div>
                </li>
              </ul>
            </div>
        
            <!-- Selected Routes List -->
            <div class="mt-4 text-white">
              <h2 class="text-lg font-bold">Selected Routes:</h2>
              <div class="mt-2 flex justify-between border-b border-slate-500">
                {{selectedRoute}}
              </div>
            </div>
          </div>
        </template>
      </ToolkitMenu>
    </div>
    <MapTomTom
      @current-zoom="mapZoom"
      @distance-km="getDistance"
      :basemap="currentBaseMap"
      :routeData="currentRouteData"
      :zoom="currentZoom"
    />
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, watch } from "vue";
import MapTomTom from "./map/tomtom/MapTemplateLine.vue";
import indonesiaData from "./map/tomtom/data/IndonesiaData.json";
import tomtomData from "./map/tomtom/data/tomtomdata.json";
import bentongData from "./map/tomtom/data/PekanBentong.json";
import ToolkitMenu from "./components/side-menu/ToolkitMenu.vue";
import ZoomMap from "./components/map-utility/ZoomMap.vue";
import BaseMap from "./components/map-utility/BaseMap.vue";
import DisplayData from "./components/card/DisplayData.vue";

import { useTomTomStore } from "./stores/useTomTomStore";
import { useBentongStore } from "./stores/useBentongStore";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { BiArrowCounterclockwise} from "oh-vue-icons/icons";
import MdCard from "./components/card/MdCard.vue";

import "mapbox-gl/dist/mapbox-gl.css";

addIcons(BiArrowCounterclockwise)

export default defineComponent({
  components: { MapTomTom, ToolkitMenu, ZoomMap, BaseMap, MdCard, DisplayData,"v-icon": OhVueIcon },
  setup() {
    const currentRouteData = ref(tomtomData);
    const zoomDistance = ref(14);
    const currentZoom = ref(0);
    const tomTomStore = useTomTomStore();
    const bentongStore = useBentongStore();
    const delayTime = ref(0);
    const travelTimeTom = ref(0);
    const selectedRoute = ref("lebuhraya shah alam- guthrie");
    const routeDetail = ref([
      {'route':'Jalan Pekan Bentong','km':'5.1'},
      {'route':'lebuhraya shah alam- guthrie','km':'6.03'},
    ])
    const countdown = ref(120);
    let intervalId = null;
    const information = ref(true)
    // const currentBaseMap = ref('mapbox://styles/naqwal/cluc1135h005j01qq22febwjl')
    // const currentBaseMap = ref('mapbox://styles/naqwal/cluaoa6te00ag01r53d1z1zi6')
    const currentBaseMap = ref("mapbox://styles/mapbox/dark-v11");

    onMounted(() => {
      tomTomStore.startAutoUpdate();
      bentongStore.startAutoUpdate();
      
    });

    const loadIndonesiaData = () => {
      currentRouteData.value = indonesiaData;
    };

    const loadTomTomData = () => {
      const latestData = tomTomStore.getLatestRouteData;
      currentRouteData.value = latestData || tomtomData;
      // console.log('route name:',latestData.routeName)
      selectedRoute.value = latestData.routeName;
    };
    const loadBentongData = () => {
      const latestData = bentongStore.getLatestRouteData;
      currentRouteData.value = latestData || bentongData;
      // console.log('route name:',latestData.routeName)
      selectedRoute.value = latestData.routeName;
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
      currentBaseMap.value = map;
    };

    const getDistance = (value) => {
      zoomDistance.value = value;
    };

    const formatTomTomTime = (seconds) => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;

      return `${hours > 0 ? hours + "h " : ""}${
        minutes > 0 ? minutes + "m " : ""
      }${remainingSeconds}s`;
    };

    const selectRoute = (value)=>{
      console.log(value.route)
      if(value.route === 'lebuhraya shah alam- guthrie'){
        loadTomTomData()
      }else{
        loadBentongData()
      }
    }

    const counTime=()=>{
      if (intervalId) clearInterval(intervalId);
      countdown.value = 120;
      intervalId = setInterval(() => {
        if (countdown.value > 0) {
          countdown.value--;
        } else {
          clearInterval(intervalId);
        }
      }, 1000);
    }

    const infoToggle=()=>{
      information.value= !information.value
    }

    watch(
      () => tomTomStore.getLatestRouteData,
      (value) => {
        if (value.routeName === selectedRoute.value) {
          delayTime.value = formatTomTomTime(value.delayTime);
          travelTimeTom.value = formatTomTomTime(value.travelTime);
          currentRouteData.value = value;
          counTime()
        }
      }
    );

    watch(
      () => bentongStore.getLatestRouteData,
      (value) => {
        if (value.routeName === selectedRoute.value) {
          delayTime.value = formatTomTomTime(value.delayTime);
          travelTimeTom.value = formatTomTomTime(value.travelTime);
          currentRouteData.value = value;
          counTime()
        }
      }
    );

    return {
      currentRouteData,
      currentBaseMap,
      loadBentongData,
      loadIndonesiaData,
      loadTomTomData,
      zoomDistance,
      currentZoom,
      increaseZoom,
      mapZoom,
      basemapChange,
      getDistance,
      decreaseZoom,
      delayTime,
      travelTimeTom,
      routeDetail,
      selectedRoute,
      selectRoute,
      countdown,
      information,
      infoToggle,
    };
  },
});
</script>

<style lang="scss" scoped></style>
