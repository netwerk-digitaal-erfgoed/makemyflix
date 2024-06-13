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

const props = defineProps<{
  sliderProps: object;
}>();

const swiper = ref<SwiperElement>();
const hideLeftNav = ref(true);
const hideRightNav = ref(false);

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
</script>

<style scoped lang="scss">
.slider {
  position: relative;
}
.swiper-button-nav {
  &::after {
    content: '';
  }
  width: 2.75rem;
  height: 2.75rem;
  background: var(--blue);
  color: var(--black);
  border-radius: 50%;

  svg {
    width: 1.75rem;
    height: 1.75rem;
  }
}
.is-hidden {
  display: none;
}
</style>
