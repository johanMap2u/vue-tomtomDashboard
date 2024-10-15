<template>
  <div class="flex">
    
    <div v-if="!baseMapExpand" >
        <slot/>
    </div>
    
    <div class="pt-14">
      <div
        :class="[
          'bg-black h-48  flex px-2 py-2 gap-2 rounded-l-xl transition-all duration-1000 ease-in-out',
          { 'w-96': !toolkit, 'w-16': toolkit },
        ]"
      >
        <div class="p-2 grid">
          <div
            class="bg-slate-800 flex justify-center items-center text-center rounded-md size-10 group"
            @click="toolExpand"
          >
            <v-icon
              name="md-keyboardarrowleft"
              :class="[
                'text-slate-500 size-8 transition-transform duration-500 group-hover:text-white',
                { 'rotate-180': !toolkit, 'rotate-0': toolkit },
              ]"
            />
          </div>

          <div
            class="flex justify-center items-center text-center size-10 group"
            @click="infotoggle"
          >
            <v-icon name="hi-information-circle" class="size-10 text-slate-700 group-hover:text-white" />
          </div>

          <div
            class="flex justify-center items-center text-center size-10 group"
            @click="baseMpExpand"
          >
            <v-icon name="fa-layer-group" class="size-8 text-slate-700 group-hover:text-white" />
          </div>
          
        </div>
        
        <div
          v-if="!toolkit"
          class="ml-4 w-full text-white transition-opacity duration-500"
        >
          <slot name="route-selected"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { FaLayerGroup, MdKeyboardarrowleft ,HiInformationCircle} from "oh-vue-icons/icons";


addIcons(MdKeyboardarrowleft, FaLayerGroup,HiInformationCircle);

export default defineComponent({
  components: { "v-icon": OhVueIcon },
  props:{
    information:{
      type:String
    }
  },
  setup(props,{emit}) {
    const toolkit = ref(true);
    const baseMapExpand = ref(true);
    const toolExpand = () => {
      toolkit.value = !toolkit.value;
    };

    const baseMpExpand = () => {
      baseMapExpand.value = !baseMapExpand.value;
    };

    const infotoggle=()=>{
      emit("info-toggle")
    }

    return {
      baseMpExpand,
      toolExpand,
      baseMapExpand,
      toolkit,
      infotoggle,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>