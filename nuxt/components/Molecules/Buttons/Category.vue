<template>
  <AtomsNavigation
    class="col-span-1 flex justify-center"
    :to="categoryPath"
    direction="down"
  >
    <AtomsIcon name="close" class="h-4 w-4" />
  </AtomsNavigation>
</template>

<script setup lang="ts">
  const route = useRoute();
  const categoryPath = { name: 'category', params: { category: route.params.category } };
</script>
