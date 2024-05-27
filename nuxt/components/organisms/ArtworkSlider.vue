<template>
  <div class="artwork-slider" v-if="artworks.length">
    <div class="flex justify-between items-center mb-2">
      <div class="text-3xl uppercase">
        {{ category.title }} {{ category.period }}
      </div>
      <AtomsNavigation
        class="text-base font-medium uppercase"
        :to="{ name: 'category', params: { category: category.id } }"
      >
        Toon alles
      </AtomsNavigation>
    </div>
    <div v-if="category.description" class="text-base tracking-wide uppercase font-light mb-7">
      {{ category.description }}
    </div>
    <MoleculesSlider
      class="artworks"
      :slider-props="artworksSliderProps"
    >
      <SplideSlide v-for="artwork in artworks" :key="artwork.id">
        <AtomsArtworkTeaser
          :artwork="artwork"
          :to="{
            name: 'category-artwork',
            params: { category: category.id, artwork: artwork.id },
          }"
        />
      </SplideSlide>
    </MoleculesSlider>
  </div>
</template>

<script setup lang="ts">
import { SplideSlide } from "@splidejs/vue-splide";
import { useArtworkStore } from "@/stores/artworks";

const props = defineProps<{
  category: Category
}>();

const { findByCategory } = useArtworkStore();
const artworks = computed(() => findByCategory(props.category.id, 10, 0));
const artworksSliderProps = {
  gap: "4.5rem"
};
</script>

<style scoped lang="scss">
.artworks {

  &.is-initialized,
  &.is-rendered {
    :deep(.splide__track) {
      overflow: visible;
    }
  }

  :deep(.splide__arrow--prev) {
    left: -4.75rem;
  }

  :deep(.splide__arrow--next) {
    right: -4.75rem;
  }
}
</style>
