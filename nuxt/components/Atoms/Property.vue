<template>
  <span v-if="isLink && allowLink" class="text-sm hover:underline"><NuxtLink :to="value">{{ label }}</NuxtLink></span>
  <span v-else class="text-sm">{{ propertyValue }}</span>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  allowLink: boolean,
  label?: string,
  value?: string
}>(), {
  allowLink: true,
  value: ''
});

const isLink = computed(() => {
  return useCheckLink(props.value);
});

const propertyValue = computed(() => {
  if (isLink && !props.allowLink) {
    return props.label;
  }
  return props.value;
});
</script>

<style scoped lang="scss"></style>
