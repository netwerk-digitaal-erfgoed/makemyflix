<template>
  <div class="header">
    <img v-if="logo" :src="logo" class="header-image flex"/>
    <span v-else-if="name" class="text-3xl text-white uppercase">{{ name }}</span>
  </div>
</template>

<script setup lang="ts">
import { useBrandingStore } from "@/stores/branding";
const { logo, name } = useBrandingStore();
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
