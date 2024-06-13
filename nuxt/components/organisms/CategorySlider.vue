<template>
  <MoleculesSlider
    class="categories-slider"
    :slider-props="categoriesSliderProps">
    <swiper-slide
      v-for="category in categories"
      :key="category.id"
      class="category-slide">
      <AtomsCategoryTeaser :category="category" />
    </swiper-slide>
  </MoleculesSlider>
</template>

<script setup lang="ts">
defineProps<{
  categories: Array<Category>;
}>();

const categoriesSliderProps = {
  spaceBetween: 20,
};
</script>

<style scoped lang="scss">
.categories-slider {
  background-color: #000000;

  .category-slide {
    transition: 0.15s ease-in-out;

    &:hover {
      width: calc(((100% + 1.25rem) / 3) - 1.25rem) !important;
    }
  }

  :deep(.swiper-button-prev) {
    left: 2rem;
  }

  :deep(.swiper-button-next) {
    right: 2rem;
  }
}
</style>
