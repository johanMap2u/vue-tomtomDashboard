<template>
  <div class="text-xs border-2 border-slate-500 px-4 py-1 rounded-lg">
    <p>{{TomtomData}}</p>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    props:{
        TomtomData:String
    },
    setup(props){

    }
})
</script>

<style lang="scss" scoped>
</style>