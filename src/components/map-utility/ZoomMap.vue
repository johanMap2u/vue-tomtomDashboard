<template>
  <div class="m-2 rounded-xl p-1 border-2 border-slate-500">
    <div
      class="flex justify-center items-center bg-slate-800 text-center size-10 group"
      @click="increaseZoom"
    >
      <v-icon
        name="bi-plus"
        class="size-8 text-gray-400 group-hover:text-white"
      />
    </div>

    <div
      class="flex justify-center items-center my-2 bg-opacity-10 text-2xl bg-black text-center size-10 group"
    >
      {{level}}
    </div>

    <div
      class="flex justify-center items-center bg-slate-800 text-center size-10 group"
      @click="decreaseZoom"
    >
      <v-icon
        name="hi-minus-sm"
        class="size-8 text-gray-400 group-hover:text-white"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { OhVueIcon, addIcons } from "oh-vue-icons";

import { BiPlus, HiMinusSm } from "oh-vue-icons/icons";

addIcons(BiPlus, HiMinusSm);

export default defineComponent({
  props: { level: Number },
  components: { "v-icon": OhVueIcon },
  setup(props, { emit }) {
    const increaseZoom = () => {
        emit("increase-zoom");
      //   currentZoom.value += 1;
    };
    const decreaseZoom = () => {
        emit("decrease-zoom")
      //   currentZoom.value -= 1;
    };
    return { increaseZoom, decreaseZoom };
  },
});
</script>

<style lang="scss" scoped></style>
