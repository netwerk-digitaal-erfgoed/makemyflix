<template>
  <div>
    <MoleculesBrandingHeader />
    <section>
      <OrganismsCategorySlider :categories="categories" class="z-20" />
    </section>
    <MoleculesBrandingIntro class="z-20" />
    <section class="py-8">
      <div class="overflow-hidden px-3">
        <div v-for="category in categories" :key="category.id" class="flex justify-center mt-16">
          <OrganismsArtworkSlider class="w-10/12" :category="category" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useCategoryStore } from "@/stores/categories";
import { useArtworkStore } from "@/stores/artworks";
import { storeToRefs } from 'pinia';

const { categories } = storeToRefs(useCategoryStore());
const { listOrFetchByCategory } = useArtworkStore();

onMounted(async () => {
  categories.value.forEach((category: Category) => listOrFetchByCategory(category.id));
});
</script>
