<template>
  <div class="app">
    <NuxtPage />
    <MoleculesSidenote />
  </div>
</template>

<script setup lang="ts">
await useQueriesStore().loadQueries();
await useCategoryStore().listOrFetchCategories();
</script>

<style lang="scss" scoped>
.app {
  min-height: 100vh;
}
</style>
