<template>
  <OrganismsFlix />
</template>

<script setup lang="ts">
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
</script>
