<script setup lang="ts">
const positionAllowHandler = () => {
  navigator.geolocation.getCurrentPosition(() => {
    console.log('sdfsdf')
  })
}
</script>

<template>
<div class="position-not-allowed">
  <div class="error-text">
    Allow location access
  </div>

  <button class="allow-button">
    Allow
  </button>
</div>
</template>

<style scoped lang="scss">
.position-not-allowed {
  @apply w-full h-full;
  @apply flex flex-col items-center justify-center;
  @apply space-y-4;
}

.error-text {
  @apply text-[24px];
}

.allow-button {
  @apply bg-gray-200;
  @apply rounded-md;
  @apply w-40 py-2 px-4;
  @apply hover:bg-gray-300;
}
</style>
