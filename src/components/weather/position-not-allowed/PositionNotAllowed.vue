<script setup lang="ts">
import { XCircleIcon } from '@heroicons/vue/24/outline';
</script>

<template>
  <div class="position-not-allowed">
    <div class="error-text">
      <x-circle-icon class="w-10 h-10" />
        Please, enable geolocation access!
    </div>
  </div>
</template>

<style scoped lang="scss">
.position-not-allowed {
  @apply w-full h-full;
  @apply flex flex-col items-center justify-center;
  @apply space-y-4 my-6;
}

.error-text {
  @apply flex flex-col items-center;
  @apply text-[20px];

}

.allow-button {
  @apply bg-gray-200;
  @apply rounded-md;
  @apply w-40 py-2 px-4;
  @apply hover:bg-gray-300;
}
</style>
