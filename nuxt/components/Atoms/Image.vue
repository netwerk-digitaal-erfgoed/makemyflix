<template>
  <img
    v-if="imageUrl"
    :src="imageUrl"
    :alt="alt" />
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const { supportIIIF } = storeToRefs(useFlixStore());
const props = withDefaults(
  defineProps<{
    identifier: string;
    region?: string;
    size?: string;
    rotation?: string;
    quality?: string;
    format?: string;
    alt?: string;
  }>(),
  {
    region: 'full',
    size: 'max',
    rotation: '0',
    quality: 'default',
    format: 'webp',
  },
);

const imageUrl = computed<string>(() => {
  const { identifier, region, size, rotation, quality, format } = props;
  if (!supportIIIF.value || useIsIIIF(identifier)) {
    return identifier;
  }
  return `/api/images/${btoa(identifier)}/${region}/${size}/${rotation}/${quality}.${format}`;
});
</script>
