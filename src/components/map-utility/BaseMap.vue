<template>
    <div class="grid grid-cols-2 p-2 gap-2">
        <div class="size-20 border-2 border-slate-700 p-2 group" @click="basemap('mapbox://styles/mapbox/dark-v11')">
            <img src="/basemap/map-image.jpg" class="object-contain  group-hover:opacity-50" alt="dark map">
        </div>
        <div class="size-20 border-2 border-slate-700 p-2 group" @click="basemap('mapbox://styles/naqwal/cluc1135h005j01qq22febwjl')">
            <img src="/basemap/clown_face.jpg" class="object-contain  group-hover:opacity-50" alt="dark map">
        </div>
        <div class="size-20 border-2 border-slate-700 p-2 group" @click="basemap('mapbox://styles/naqwal/cluaoa6te00ag01r53d1z1zi6')">
            <img src="/basemap/JohanPic.png" class="object-contain  group-hover:opacity-50" alt="dark map">
        </div>
    </div>
  
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
setup(props,{emit}){
    const basemap=(map)=>{
        emit("selected-basemap", map);
    }
    return{basemap}
}
})
</script>

<style lang="scss" scoped>
</style>