<template>
  <div class="page">
    <MoleculesBrandingHeader />
    <OrganismsCategorySlider
      :categories="categories"
      class="elevated" />
    <MoleculesBrandingIntro class="elevated" />
    <section class="categories">
      <div class="container">
        <div
          v-for="category in categories"
          :key="category.id"
          class="category">
          <OrganismsArtworkSlider
            class="slider"
            :category="category" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
/**
 * Store deps
 */
const categoriesStore = useCategoryStore();
const { categories } = storeToRefs(categoriesStore);
const { listOrFetchByCategory } = useArtworkStore();

/**
 * Lifecycle methods
 */
onMounted(async () => {
  // First fetch the categories
  await categoriesStore.listOrFetchCategories();

  // Then fetch the artworks for each category
  categories.value.forEach((category: Category) => listOrFetchByCategory(category.id));
});
</script>

<style lang="scss" scoped>
.page {
  .elevated {
    z-index: 20;
  }

  .categories {
    padding-block: var(--space-8);

    .container {
      padding-inline: var(--space-3);
      overflow: hidden;

      .category {
        display: flex;
        justify-content: center;
        margin-top: var(--space-16);

        .slider {
          width: 83.33%;
        }
      }
    }
  }
}
</style>
