<script setup lang="ts">
import TheTitle from '@/components/weather/title/TheTitle.vue';
import { ref } from 'vue';
import WeatherService, { WeatherResponseType } from '@/api/weather.ts';
import WeatherDetail from '@/components/weather/weather-detail/WeatherDetail.vue';
import { MapPinIcon } from '@heroicons/vue/24/outline';
import WeatherView from '@/components/weather/weather-view/WeatherView.vue';
import PositionNotAllowed from '@/components/weather/position-not-allowed/PositionNotAllowed.vue';

const weatherApi = new WeatherService();
const positionWeather = ref<WeatherResponseType | null>(null);
const isLoading = ref(true);
const positionIsNotAllowed = ref(false);
const isShowPlaceList = ref(false);

const togglePlaceListHandler = () => {
  isShowPlaceList.value = !isShowPlaceList.value;
}

const positionCallback: PositionCallback = async (position) => {
  positionWeather.value = await weatherApi.getWeatherByCoord(
    position.coords.latitude,
    position.coords.longitude
  );

  console.log(positionWeather.value)
  isLoading.value = false;
};

const errorCallback: PositionErrorCallback = () => {
  isLoading.value = false;
  positionIsNotAllowed.value = true;
}

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(positionCallback, errorCallback )
} else {
  isLoading.value = false;
}

</script>

<template>
<div class="weather-widget">
  <div v-if="isLoading" class="loader">
    <map-pin-icon class="w-6 h-6" />
    <span>Location determination...</span>
  </div>

  <position-not-allowed v-else-if="positionIsNotAllowed" />

  <div v-else class="weather-container">
    <the-title
      :place="positionWeather?.name"
      :is-show-place-list="isShowPlaceList"
      @toggle="togglePlaceListHandler"
    />
    <weather-view
      :temp="positionWeather?.main.temp"
      :feels-like-temp="positionWeather?.main.feels_like"
      :icon-code="positionWeather?.weather[0].icon"
    />
    <weather-detail
      :weather="positionWeather?.weather[0]"
      :humidity="positionWeather?.main.humidity"
      :pressure="positionWeather?.main.pressure"
      :visibility="positionWeather?.visibility"
      :wind="positionWeather?.wind"
    />
  </div>
</div>
</template>

<style scoped lang="scss">
.weather-widget {
  @apply flex flex-col;
  @apply sm:w-2/3 sm:h-auto;
  @apply lg:w-1/3;
  @apply bg-white rounded-lg;
  @apply shadow-md;
  @apply p-4;

  .weather-container {
    @apply h-full w-full;
  }

  .loader {
    @apply flex items-center justify-center;
    @apply flex-col;
    @apply h-full w-full;
  }
}
</style>
