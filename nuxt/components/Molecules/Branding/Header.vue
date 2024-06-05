<template>
  <div class="header">
    <img v-if="branding?.logo" :src="branding.logo" class="header-image flex"/>
    <span v-else-if="branding?.name" class="text-3xl text-white uppercase">{{ branding.name }}</span>
  </div>
</template>

<script setup lang="ts">
const { branding } = storeToRefs(useFlixStore());
</script>

<style lang="scss" scoped>
  .header {
    background-color: black;
    padding: 2rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: $header-height;
  }
  .header-image {
    max-height: 3.75rem;
  }
</style>
