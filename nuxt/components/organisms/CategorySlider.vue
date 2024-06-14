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
  background-color: var(--primary-color);

  .category-slide {
    transition: 0.15s ease-in-out;

    &:hover {
      width: calc(((100% + var(--space-5)) / 3) - var(--space-5)) !important;
    }
  }

  :deep(.swiper-button-prev) {
    left: var(--space-8);
  }

  :deep(.swiper-button-next) {
    right: var(--space-8);
  }
}
</style>
