<template>
  <AtomsNavigation
    class="category-button"
    :to="categoryPath"
    direction="down">
    <AtomsIcon
      name="close"
      class="icon" />
  </AtomsNavigation>
</template>

<script setup lang="ts">
const route = useRoute();
const categoryPath = {
  name: 'flix-category',
  params: { category: route.params.category },
} as To;
</script>

<style lang="scss" scoped>
.category-button {
  grid-column: span 1 / span 1;
  display: flex;
  justify-content: center;
  color: inherit;
  text-decoration: inherit;

  .icon {
    width: var(--space-4);
    height: var(--space-4);
  }
}
</style>
