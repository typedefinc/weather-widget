<script setup lang="ts">
import TheTitle from '@/components/weather/title/TheTitle.vue';
import { computed, onMounted, ref, watch } from 'vue';
import WeatherService, { WeatherResponseType } from '@/api/weather.ts';
import WeatherDetail from '@/components/weather/weather-detail/WeatherDetail.vue';
import { MapPinIcon } from '@heroicons/vue/24/outline';
import WeatherView from '@/components/weather/weather-view/WeatherView.vue';
import PositionNotAllowed from '@/components/weather/position-not-allowed/PositionNotAllowed.vue';
import PlaceList, { PlaceObjectType } from '@/components/weather/place-list/PlaceList.vue';
import PlaceSlider from '@/components/weather/place-slider/PlaceSlider.vue';

const weatherApi = new WeatherService();

const currentPlaceId = ref(0);
const currentWeather = ref<WeatherResponseType | null>(null);
const placeList = ref(JSON.parse(localStorage.getItem('places') ?? '[]'));

const isLoading = ref(true);
const positionIsNotAllowed = ref(false);
const isShowPlaceList = ref(false);

const currentTitle = computed(() => {
  return isShowPlaceList.value ? 'Place List' : currentWeather.value?.name ?? '';
});

const positionCallback: PositionCallback = async (position) => {
  currentWeather.value = await weatherApi.getWeatherByCoord(
    position.coords.latitude,
    position.coords.longitude
  );

  isLoading.value = false;
};

const errorCallback: PositionErrorCallback = () => {
  isLoading.value = false;
  positionIsNotAllowed.value = true;
  currentWeather.value = null;
};

const togglePlaceListHandler = () => {
  isShowPlaceList.value = !isShowPlaceList.value;
}

const addPlaceHandler = async (place: string) => {
  const newWeather = await weatherApi.getWeatherByPlaceName(place);

  if (newWeather) {
    placeList.value.push(
      {
        id: newWeather.id,
        name: newWeather.name,
      }
    );

    localStorage.setItem('places', JSON.stringify(placeList.value));
  }
}
const deletePlaceHandler = (id: number) => {
  placeList.value = placeList.value.filter((item: PlaceObjectType) => item.id !== id);

  localStorage.setItem('places', JSON.stringify(placeList.value));
}

const changePlaceIdHandler = (id: number) => {
  currentPlaceId.value = id;
}

const changePlaceListHandler = (list: PlaceObjectType[]) => {
  placeList.value = list;

  localStorage.setItem('places', JSON.stringify(placeList.value));
}

onMounted(() => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(positionCallback, errorCallback)
  } else {
    isLoading.value = false;
  }
});

watch(currentPlaceId, async (value: number) => {
  if (value === 0) {
    navigator.geolocation.getCurrentPosition(positionCallback, errorCallback);
  } else {
    currentWeather.value = await weatherApi.getWeatherById(value);
  }
})
</script>

<template>
  <div class="weather-widget">
    <the-title
      v-if="!isLoading"
      :title="currentTitle"
      :is-show-place-list="isShowPlaceList"
      @toggle="togglePlaceListHandler"
    />

    <div v-if="!isShowPlaceList" class="weather-dashboard">
      <div v-if="isLoading" class="loader">
        <map-pin-icon class="w-6 h-6"/>
        <span>Location determination...</span>
      </div>

      <place-slider
        v-if="!isLoading"
        :place-list="placeList"
        :current-place-id="currentPlaceId"
        @change-place-id="changePlaceIdHandler"
      />

      <position-not-allowed v-if="positionIsNotAllowed && !currentWeather" />

      <div v-if="!!currentWeather" class="weather-container">
        <weather-view
          :temp="currentWeather.main.temp"
          :feels-like-temp="currentWeather.main.feels_like"
          :icon-code="currentWeather.weather[0].icon"
        />
        <weather-detail
          :weather="currentWeather.weather[0]"
          :humidity="currentWeather.main.humidity"
          :pressure="currentWeather.main.pressure"
          :visibility="currentWeather?.visibility"
          :wind="currentWeather.wind"
        />
      </div>
    </div>

    <place-list
      v-if="isShowPlaceList"
      :place-list="placeList"
      @add-place="addPlaceHandler"
      @delete-place="deletePlaceHandler"
      @change-place-list="changePlaceListHandler"
    />
  </div>
</template>

<style scoped lang="scss">
.weather-widget {
  @apply flex flex-col;
  @apply w-[90vw];
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
