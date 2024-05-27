<template>
  <div class="min-h-screen">
    <NuxtPage />
    <MoleculesSidenote />
  </div>
</template>

<script setup lang="ts">
import { useCategoryStore } from "@/stores/categories";
import { useBrandingStore } from "@/stores/branding";
import { useQueriesStore } from "@/stores/queries";
await useBrandingStore().loadBranding();
await useQueriesStore().loadQueries();
await useCategoryStore().listOrFetchCategories();
</script>
