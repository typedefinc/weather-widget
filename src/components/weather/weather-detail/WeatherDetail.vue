<script setup lang="ts">
import { WeatherObjectType, WindObjectType } from '@/api/weather.ts';
import { ArrowUpIcon} from '@heroicons/vue/24/outline';

interface WeatherDetailProps {
  weather?: WeatherObjectType,
  humidity?: number,
  pressure?: number,
  visibility?: number,
  wind?: WindObjectType,
}

defineProps<WeatherDetailProps>();
</script>

<template>
<div class="weather-detail">
  <div class="weather">
    <div class="main">
      {{ weather?.main }}
    </div>
    <div class="weather-description">
      {{ weather?.description }}
    </div>
  </div>

  <div class="additional-information">
    <div class="section">
      <div class="wind">
        <div>Wind speed and direction:</div>
        <arrow-up-icon class="w-5 h-5" :style="`transform: rotate(${wind?.deg}deg;`" />

        <div>{{ wind?.speed }} m/s</div>
      </div>
    </div>
    <div class="section">
      <div class="humidity">
        Humidity: {{ humidity }} %
      </div>
      <div class="pressure">
        Pressure: {{ pressure }} hPa
      </div>
    </div>
    <div class="section">
      <div class="visibility">
        Visibility: {{ visibility }} m
      </div>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
.weather-detail {
  @apply flex flex-col;
  @apply space-y-2;
  @apply w-full h-2/3;
  @apply py-2;

  .weather {
    .main {
     @apply text-[32px];
    }

    .weather-description {
      @apply text-gray-500;
      @apply text-sm leading-[10px];
    }
  }

  .additional-information {
    @apply w-full;

    .section {
      @apply flex;
      @apply text-[16px];
      @apply py-2;

      .wind {
        @apply flex space-x-2 items-center;
        @apply w-full;
      }

      .visibility, .humidity, .pressure {
        @apply flex items-center justify-start;
        @apply w-1/2;
      }
    }
  }
}
</style>
