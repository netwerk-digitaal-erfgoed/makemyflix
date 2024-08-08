<template>
  <MoleculesSlider
    class="categories-slider"
    :slider-props="categoriesSliderProps">
    <swiper-slide
      v-for="category in categories"
      :key="category.id"
      class="category-slide"
      :style="slideStyles">
      <AtomsCategoryTeaser
        :category="category"
        :preview="preview" />
    </swiper-slide>
  </MoleculesSlider>
</template>

<script setup lang="ts">
defineProps<{
  categories: Array<Category>;
  preview?: boolean;
}>();

const categoriesSliderProps = {
  slidesPerView: 1.2,
  spaceBetween: 20,
  breakpoints: {
    1024: {
      slidesPerView: 4.2,
    },
  },
};

const slideStyles = computed(() => {
  return {
    '--max-width-slide': window.innerWidth / 3 + 'px',
  };
});
</script>

<style scoped lang="scss">
.categories-slider {
  background-color: var(--primary-color);

  .category-slide {
    transition: 0.15s ease-in-out;

    &:hover {
      width: var(--max-width-slide) !important;
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
