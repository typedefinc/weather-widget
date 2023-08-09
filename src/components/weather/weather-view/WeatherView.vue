<script setup lang="ts">
import { computed } from 'vue';

interface WeatherViewProps {
  temp: number,
  feelsLikeTemp: number,
  iconCode: string,
}

const props = defineProps<WeatherViewProps>();
const formattedTemp = (temp: number) => Math.floor(temp);
const iconUrl = computed(() => {
  return `${import.meta.env.VITE_APP_WEATHER_ICON_API}/${props.iconCode}@4x.png`;
})
</script>

<template>
<div class="weather-view">
  <div class="weather-image">
    <img :src="iconUrl" alt="weather-icon">
  </div>
  <div class="temperature">
    <div>{{ formattedTemp(temp) }} °C</div>
    <div class="feels-like-temp">Feels like: {{ formattedTemp(feelsLikeTemp) }} °C</div>
  </div>
</div>
</template>

<style scoped lang="scss">
.weather-view {
  @apply flex;
  @apply w-full h-[200px];

  .weather-image {
    @apply flex items-center;
    @apply w-full h-full;
  }

  .temperature {
    @apply flex flex-col items-center justify-center;
    @apply w-full h-full;
    @apply text-[48px] text-gray-800;

    .feels-like-temp {
      @apply text-sm text-gray-500;
    }
  }
}
</style>
