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
const { path } = useFlixStore();

const categoryPath = {
  name: 'flix-category',
  params: { flix: path, category: route.params.category },
};
</script>
