<template>
  <Splide :has-track="false" :options="splideProps" aria-label="Slides">
    <SplideTrack class="slider-track">
      <slot />
    </SplideTrack>

    <div class="splide__arrows">
      <button class="splide__arrow splide__arrow--prev">
        <AtomsIcon name="arrowLeft" />
      </button>

      <button class="splide__arrow splide__arrow--next">
        <AtomsIcon name="arrowRight" />
      </button>
    </div>
  </Splide>
</template>

<script setup lang="ts">
import { Splide, SplideTrack } from "@splidejs/vue-splide";

const props = defineProps<{
  sliderProps: Object,
}>();

const splideProps = Object.assign(
  {
    pagination: false,
    perMove: 1,
    perPage: 4,
    speed: 300,
  },
  props.sliderProps
);
</script>

<style scoped lang="scss">
:deep(.splide__arrow) {
  width: 2.75rem;
  height: 2.75rem;
  background: #f2f5ff;
  opacity: 1 !important;

  svg {
    width: 1.25rem;
    height: 0.875rem;
  }
}

:deep(.splide__arrow:disabled) {
  display: none;
}

:deep(.splide__arrow--prev) {
  svg {
    transform: none;
  }
}
</style>
