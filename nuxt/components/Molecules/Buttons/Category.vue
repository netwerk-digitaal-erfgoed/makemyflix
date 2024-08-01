<template>
  <AtomsNavigation
    class="category-button"
    :to="categoryPath"
    direction="down">
    <Icon
      icon="mdi:close"
      class="icon" />
  </AtomsNavigation>
</template>

<script setup lang="ts">
const flixStore = useFlixStore();
const route = useRoute();
const categoryPath = {
  name: 'flix-category',
  params: {
    flix: flixStore.currentFlix?.id,
    category: route.params.category,
  },
} as To;
</script>

<style lang="scss" scoped>
.category-button {
  display: flex;
  justify-content: center;

  .icon {
    width: var(--space-7);
    height: var(--space-7);
  }
}
</style>
