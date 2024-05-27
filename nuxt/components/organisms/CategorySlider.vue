<template>
  <MoleculesSlider
    class="categories-slider"
    :slider-props="categoriesSliderProps"
  >
    <SplideSlide
      v-for="category in categories"
      :key="category.id"
      class="category-slide"
    >
      <AtomsCategoryTeaser :category="category" />
    </SplideSlide>
  </MoleculesSlider>
</template>

<script setup lang="ts">
import { SplideSlide } from "@splidejs/vue-splide";

const props = defineProps<{
  categories: Array<Category>,
}>();

const categoriesSliderProps = {
  gap: "1.25rem",
  padding: { right: "5%" }
};

</script>

<style scoped lang="scss">
.categories-slider {
  :deep(.slider-track) {
    background-color: #000000;
  }

  .category-slide {
    transition: 0.15s ease-in-out;

    &:hover {
      width: calc(((100% + 1.25rem) / 3) - 1.25rem) !important;
    }
  }

  :deep(.splide__arrow--prev) {
    left: 2rem;
  }

  :deep(.splide__arrow--next) {
    right: 2rem;
  }
}
</style>
