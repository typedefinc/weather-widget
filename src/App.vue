<script setup lang="ts">
import TheWeather from '@/components/weather/TheWeather.vue';
</script>

<template>
  <div class="wrapper">
    <the-weather />
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  @apply flex items-center justify-center;
  @apply w-[100vw] h-[100vh];
  @apply bg-gray-200;
}
</style>
