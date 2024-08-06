<template>
  <div class="slider">
    <swiper-container
      ref="swiper"
      v-bind="swiperProps"
      @swiperslidechange="setNavBtnVisibility">
      <slot />
    </swiper-container>
    <button
      class="swiper-button-nav swiper-button-prev"
      :class="{ 'is-hidden': hideLeftNav }"
      ref="prevButton"
      @click="goToPrev">
      <Icon icon="mdi:arrow-left" />
    </button>
    <button
      class="swiper-button-nav swiper-button-next"
      :class="{ 'is-hidden': hideRightNav }"
      ref="nextButton"
      @click="goToNext">
      <Icon icon="mdi:arrow-right" />
    </button>
  </div>
</template>

<script setup lang="ts">
import type Swiper from 'swiper';

interface SwiperElement extends HTMLElement {
  swiper: Swiper;
}

const flixBuilderStore = useFlixBuilderStore();

const props = defineProps<{
  sliderProps: object;
}>();

const swiper = ref<SwiperElement>();
const hideLeftNav = ref(true);
const hideRightNav = ref(false);

const { previewMediaQueryClassName } = storeToRefs(flixBuilderStore);

const availableWidth = useAvailableFlixWidth();

const swiperProps: any = Object.assign(
  {
    slidesPerView: 4.2,
    spaceBetween: 72,
    pagination: false,
  },
  props.sliderProps,
);

const goToPrev = () => {
  if (swiper.value) {
    swiper.value.swiper.slidePrev();
  }
};

const goToNext = () => {
  if (swiper.value) {
    swiper.value.swiper.slideNext();
  }
};

// This function is called when the slide changes.
// It also triggers when for example initialSlide is set.
const setNavBtnVisibility = (event: CustomEvent) => {
  const [swiper]: [Swiper] = event.detail;
  hideLeftNav.value = swiper.isBeginning;
  hideRightNav.value = swiper.isEnd;
};

watch(previewMediaQueryClassName, v => {
  if (!swiper.value) {
    return;
  }

  const s = swiper.value.swiper;

  const slidesPerView = v === 'laptop' ? 4.2 : 1.2;

  if (!s.params.breakpoints) {
    s.params.breakpoints = {};
  }

  if (!s.params.breakpoints![availableWidth.value]) {
    s.params.breakpoints![availableWidth.value] = {};
  }

  s.params.breakpoints![availableWidth.value].slidesPerView = slidesPerView;

  s.update();
});
</script>

<style scoped lang="scss">
.slider {
  position: relative;
}
.swiper-button-nav {
  width: var(--space-11);
  height: var(--space-11);
  background: var(--tertiary-color);
  color: var(--text-color);
  border-radius: 50%;

  svg {
    width: var(--space-7);
    height: var(--space-7);
  }

  &::after {
    content: '';
  }
}
.is-hidden {
  display: none;
}

@mixin slider-sm {
  .swiper-button-nav {
    display: none;
  }
}

@include sm-screen-down {
  @include slider-sm()
}

.preview {
  &-tablet,
  &-cellphone {
    @include slider-sm()
  }
}
</style>
