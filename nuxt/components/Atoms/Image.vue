<template>
  <img
    v-if="imageUrl"
    :src="imageUrl"
    :alt="alt" />
</template>

<script setup lang="ts">
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
  if (!supportIIIF.value) {
    return identifier;
  }

  if (useIsIIIF(identifier)) {
    const parts = identifier.split('/');
    parts[parts.length - 4] = region;
    parts[parts.length - 3] = size;
    parts[parts.length - 2] = rotation;
    return parts.join('/');
  }
  return `/api/images/${btoa(identifier)}/${region}/${size}/${rotation}/${quality}.${format}`;
});
</script>
