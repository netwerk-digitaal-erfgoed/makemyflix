<template>
  <div>
    <img v-if="imageUrl" :src="imageUrl" :alt="alt" />
    <p v-else>Loading image...</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  identifier: string,
  region: string,
  size: string,
  rotation: string,
  quality: string,
  format: string,
  alt: string
}>();

const imageUrl = ref<string>('');

onMounted(async () => {
  const {identifier, region, size, rotation, quality, format} = props;
  const baseUrl = 'https://api.a.com/transform';
  const s3BucketUrl = 'https://your-s3-bucket-name.s3.amazonaws.com/';
  const s3Key = `${btoa(identifier)}_${region}_${size}_${rotation}_${quality}.${format || 'jpg'}`;
  const s3Url = `${s3BucketUrl}${s3Key}`;

  try {
    // Check if the image exists in S3
    const response = await fetch(s3Url, { method: 'HEAD' });
    if (response.ok) {
      return s3Url;
    }
  } catch (error) {
    console.error('Error checking S3:', error);
  }

  // If the image does not exist in S3, call the transformation endpoint
  const url = new URL(baseUrl);
  url.searchParams.append('identifier', identifier);
  if (region) url.searchParams.append('region', region);
  if (size) url.searchParams.append('size', size);
  if (rotation) url.searchParams.append('rotation', rotation);
  if (quality) url.searchParams.append('quality', quality);
  if (format) url.searchParams.append('format', format);

  const response = await fetch(url);
  const data = await response.json();
  return data.url;
});
</script>
