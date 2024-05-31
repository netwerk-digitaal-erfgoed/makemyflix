<template>
  <img v-if="imageUrl" :src="imageUrl" :alt="alt" />
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const props = withDefaults(defineProps<{
  identifier: string,
  region?: string,
  size?: string,
  rotation?: string,
  quality?: string,
  format?: string,
  alt?: string
}>(), {
  region: 'full',
  size: 'max',
  rotation: '0',
  quality: 'default',
  format: 'jpg'
});

const imageUrl = computed<string>(() => {
  const {identifier, region, size, rotation, quality, format} = props;
  return `${config.app.backendUrl}/${btoa(identifier)}/${region}/${size}/${rotation}/${quality}.${format}`;
});
</script>
