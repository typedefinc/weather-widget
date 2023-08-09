<script setup lang="ts">
import { PlaceObjectType } from '@/components/weather/place-list/PlaceList.vue';
import { MapPinIcon } from '@heroicons/vue/24/solid';
import { computed } from 'vue';

interface PlaceSliderProps {
  placeList: PlaceObjectType[],
  currentPlaceId: number,
}
const props = defineProps<PlaceSliderProps>();

const emit = defineEmits(['change-place-id']);

const changeCurrentPlaceId = (id: number) => {
  if (props.currentPlaceId !== id) {
    emit('change-place-id', id);
  }
}
</script>

<template>
<div class="place-slider">
  <div
    class="position-item text-gray-400"
    :class="{active: currentPlaceId === 0}"
    @click="changeCurrentPlaceId(0)"
  >
    <map-pin-icon
      class="w-4 h-4"
    />
  </div>

  <div
    v-for="place in placeList"
    :key="place.id"
    class="slider-item"
    :class="{ active: place.id === currentPlaceId}"
    @click="changeCurrentPlaceId(place.id)"
  ></div>
</div>
</template>

<style scoped lang="scss">
.place-slider {
  @apply flex items-center justify-center;
  @apply w-full h-4 space-x-1;

  .position-item {
    @apply cursor-pointer;

    &.active {
      color: black;
    }
  }

  .slider-item {
    @apply rounded-full bg-gray-300;
    @apply w-3 h-3 cursor-pointer;

    &.active {
      background-color: black;
    }
  }
}
</style>
