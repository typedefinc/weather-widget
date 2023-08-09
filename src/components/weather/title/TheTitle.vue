<script setup lang="ts">
import IconButton from '@/components/ui/buttons/IconButton.vue';
import { Cog8ToothIcon, ArrowLeftIcon } from '@heroicons/vue/24/outline';

interface WeatherTitleProps {
  title: string,
  isShowPlaceList: boolean,
}
defineProps<WeatherTitleProps>();

const emit = defineEmits([
  'toggle',
]);

const toggleShowPlaceList = () => {
  emit('toggle');
}
</script>

<template>
<div class="weather-title">
  <div>{{ title }}</div>

  <div class="settings-button">
    <icon-button @click="toggleShowPlaceList">
      <arrow-left-icon v-if="isShowPlaceList" class="w-6 h-6" />
      <cog8-tooth-icon v-else class="w-6 h-6" />
    </icon-button>
  </div>
</div>
</template>

<style scoped lang="scss">
.weather-title {
  @apply flex items-center;
  @apply w-full h-10 relative;
  @apply text-xl;
}

.settings-button {
  @apply absolute right-0;
}
</style>
