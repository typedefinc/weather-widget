<script setup lang="ts">

</script>

<template>
<button class="icon-button">
  <slot />
</button>
</template>

<style scoped lang="scss">
.icon-button {
  @apply flex items-center justify-center;
  @apply w-10 h-10;
  @apply rounded-full;
  @apply hover:bg-gray-200;
}
</style>
