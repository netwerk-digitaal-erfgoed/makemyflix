<template>
  <div
    class="artwork-slider"
    v-if="artworks.length">
    <h1 class="artwork-title">{{ category.title }} {{ category.period }}</h1>
    <AtomsNavigation
      class="navigation-link"
      :to="categoryPath">
      Toon alles
    </AtomsNavigation>
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
              flix: flixStore.currentFlix?.id ?? '',
              category: category.slug,
              artwork: artwork.slug,
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
  slidesPerView: 1.2,
  spaceBetween: 24,
  injectStyles: [
    `
      .swiper {
        overflow: visible;
      }
    `,
  ],
  breakpoints: {
    1024: {
      slidesPerView: 4.2,
      spaceBetween: 48,
    },
  },
};

const flixStore = useFlixStore();
const categoryPath = {
  name: 'flix-category',
  params: {
    flix: flixStore.currentFlix?.id,
    category: props.category.slug,
  },
} as To;
</script>

<style scoped lang="scss">
.artwork-slider {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: var(--space-12) auto 1fr;
  grid-template-areas:
    'header action'
    'description description'
    'slider slider';
  row-gap: var(--space-3);
}

.artworks {
  grid-area: slider;

  :deep(.swiper-button-prev) {
    left: calc(var(--space-1) - var(--space-20));
  }

  :deep(.swiper-button-next) {
    right: calc(var(--space-1) - var(--space-20));
  }
}

.artwork-title {
  grid-area: header;
  text-transform: uppercase;
}

.artwork-description {
  grid-area: description;
  font-weight: var(--font-weight-light);
  text-transform: uppercase;
}

.navigation-link {
  grid-area: action;
  align-self: flex-end;
  justify-self: flex-end;
  color: inherit;
  text-decoration: inherit;
  text-transform: uppercase;
}

@include sm-screen-down {
  .artwork-slider {
    grid-template-rows: var(--space-6) auto 1fr auto;
    grid-template-areas:
      'header header'
      'description description'
      'slider slider'
      'action action';
    gap: var(--space-2);
  }

  .navigation-link {
    align-self: flex-end;
    justify-self: flex-start;
    border: 1px solid black;
    text-transform: unset;
    padding: var(--space-2);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-light);
  }
}
</style>
