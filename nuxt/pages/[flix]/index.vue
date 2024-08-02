<template>
  <OrganismsFlix />
</template>

<script setup lang="ts">
const flixStore = useFlixStore();
const route = useRoute();

/**
 * Note: Needed for transition to art page
 */
definePageMeta({
  pageTransition: {
    name: 'page',
    mode: 'in-out',
    duration: 1000,
  },
});

onBeforeMount(async () => {
  await flixStore.setupFlix(route.params.flix as string);
});
</script>
