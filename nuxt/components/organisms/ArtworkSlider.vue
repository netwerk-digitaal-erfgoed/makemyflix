<template>
  <div
    class="artwork-slider"
    v-if="artworks.length">
    <div class="artwork-header">
      <h1 class="artwork-title">{{ category.title }} {{ category.period }}</h1>
      <AtomsNavigation
        class="navigation-link"
        :to="{
          name: 'flix-category',
          params: {
            category: category.id,
          },
        }">
        Toon alles
      </AtomsNavigation>
    </div>
    <div
      v-if="category.description"
      class="artwork-description">
      {{ category.description }}
    </div>
    <MoleculesSlider
      class="artworks"
      :slider-props="artworksSliderProps">
      <swiper-slide
        v-for="artwork in artworks"
        :key="artwork.id">
        <AtomsArtworkTeaser
          :artwork="artwork"
          :to="{
            name: 'flix-category-artwork',
            params: {
              category: category.id,
              artwork: artwork.id,
            },
          }" />
      </swiper-slide>
    </MoleculesSlider>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  category: Category;
}>();

const { findByCategory } = useArtworkStore();
const artworks = computed(() => findByCategory(props.category.id, 10, 0));
const artworksSliderProps = {
  spaceBetween: 72,
  injectStyles: [
    `
      .swiper {
        overflow: visible;
      }
    `,
  ],
};
</script>

<style scoped lang="scss">
.artworks {
  :deep(.swiper-button-prev) {
    left: calc(var(--space-1) - var(--space-20));
  }

  :deep(.swiper-button-next) {
    right: calc(var(--space-1) - var(--space-20));
  }
}

.artwork-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-2);
}

.artwork-title {
  text-transform: uppercase;
}

.artwork-description {
  font-weight: var(--font-weight-light);
  text-transform: uppercase;
  margin-bottom: var(--space-7);
}

.navigation-link {
  color: inherit;
  text-decoration: inherit;
  text-transform: uppercase;
}
</style>
