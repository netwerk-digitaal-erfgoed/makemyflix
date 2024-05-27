
<template>
  <NuxtLink :to="to" @click.prevent="animateNavigation">
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
  const { $navigate } = useNuxtApp()
  const props = withDefaults(defineProps<{
    direction?: string,
    to: Object
  }>(), {
    direction: ''
  });

  const animateNavigation = function () {
    return $navigate(props.to, props.direction);
  }
</script>
