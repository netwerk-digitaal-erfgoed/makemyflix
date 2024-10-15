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
          v-for="category in renderableCategories"
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
 * Deps
 */
const categoriesStore = useCategoryStore();
const artworkStore = useArtworkStore();
const { categories } = storeToRefs(categoriesStore);

/**
 * Computed properties
 */
const renderableCategories = computed(() => {
  return categories.value;
});

/**
 * Lifecycle methods
 */
onMounted(async () => {
  // TODO: Maybe limit the call if the current flix is a preview flix
  await categoriesStore.listOrFetchCategories();

  categories.value.forEach((category: Category) => artworkStore.listOrFetchByCategory(category.id));
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
