<script setup lang="ts">
import { ref } from 'vue';
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline';
import { VueDraggableNext } from 'vue-draggable-next';

export interface PlaceObjectType {
  id: number,
  name: string,
}

interface PlaceListProps {
  placeList: PlaceObjectType[],
}

const props = defineProps<PlaceListProps>();

const inputData = ref();

const emit = defineEmits([
  'add-place',
  'change-place-list',
  'delete-place',
])

const addPlace = () => {
  if (inputData.value) {
    emit('add-place', inputData.value);
    inputData.value = '';
  }
}

const dragHandler = () => {
  emit('change-place-list', props.placeList);
}

const deleteHandler = (id: number) => {
  emit('delete-place', id);
}
</script>

<template>
  <div class="place-list">
    <input
      type="text"
      v-model="inputData"
      class="add-place__input"
      placeholder="Enter place and press Enter"
      @keydown.enter="addPlace"
    >

    <div class="list">
      <vue-draggable-next :list="placeList" @change="dragHandler">
        <div v-for="place of placeList" :key="place.id" class="place-list-item">
          <div class="drag-item">
            <bars3-icon class="w-5 h-5 text-gray-500" />
          </div>
          <div>{{ place.name }}</div>
          <button class="delete-button" @click="deleteHandler(place.id)">
            <x-mark-icon class="w-5 h-5" />
          </button>
        </div>
      </vue-draggable-next>
    </div>
  </div>
</template>

<style scoped lang="scss">
.place-list {
  @apply flex flex-col space-y-1;
  @apply w-full h-full;
  @apply mt-2;

  .add-place__input {
    @apply w-full h-10;
    @apply px-4 mb-2;
    @apply outline-none border;
    @apply rounded-md;
  }

  .place-list-item {
    @apply flex items-center space-x-2;
    @apply p-2 rounded-md hover:bg-gray-100;
    @apply relative;

    .drag-item {
      @apply cursor-grab;
    }

    .delete-button {
      @apply absolute;
      @apply right-2;
    }
  }
}
</style>
