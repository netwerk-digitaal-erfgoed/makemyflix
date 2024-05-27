<template>
  <div class="page absolute z-10 bg-white h-screen w-screen border-blue grid" :class="transition">
    <MoleculesHeader :title="title" :showCategory="true" class="row-start-1" />
    <div class="row-start-2 h-full w-full overflow-hidden grid grid-cols-12 grid-rows-12">
      <MoleculesIconNavigation name="arrowLeft" :to="navPath(true)" v-if="state.prev" class="col-span-1 flex justify-center items-center row-start-1 row-span-8 col-start-1" />
      <div class="image-container col-start-2 col-span-10 row-start-1 row-span-8 flex justify-center items-center">
        <img :src="artworkImage" v-if="artworkImage" class="w-auto max-h-full max-w-full" />
        </div>
      <div class="col-start-2 col-span-6 row-start-9 row-span-4 flex flex-col m-4 mr-0" ref="descriptionContainer">
        <h2 class="text-2xl" ref="titleElement">{{ currentArtwork?.title }}</h2>
        <div :class="visualizeDescription">{{ currentArtwork?.description }}</div>
      </div>
      <div class="col-start-8 col-span-4 row-start-9 row-span-4 p-8 grid grid-cols-2 h-min gap-y-4">
        <AtomsPropertyGroup v-for="(prop, name) in currentArtwork?.properties" :key="name" :label="name.toString()" :prop="prop" :groupName="name.toString()"/>
      </div>
      <MoleculesIconNavigation name="arrowRight" :to="navPath()" v-if="state.next" class="col-span-1 flex justify-center items-center row-start-1 row-span-8 col-start-12" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTransitionStore } from '@/stores/transition';
import { useCategoryStore } from "@/stores/categories";
import { useArtworkStore } from "@/stores/artworks";
import { storeToRefs } from 'pinia';

// Transition settings
definePageMeta({
  middleware: ['redirect-without-artwork'],
  pageTransition: {
    name: "slide",
    mode: "in-out",
    duration: 1000,
    onBeforeEnter() { useNoScroll() },
    onAfterEnter() { useScroll() },
    onBeforeLeave() { useNoScroll() },
    onAfterLeave() { useScroll() }
  }
});

const { $navigate } = useNuxtApp();
const state = reactive<{next?: Artwork, prev?:Artwork}>({
  next: undefined,
  prev: undefined
})

// Get the transition needed for the animations
const store = useTransitionStore();
const { transition } = storeToRefs(store);

// Find the category and artwork
const { findCategoryById } = useCategoryStore();
const artworkStore = useArtworkStore();
const { findById, loadNext, findNext, findPrev } = artworkStore;
const { totalArtworks } = storeToRefs(artworkStore);

// Find the current category
const route = useRoute();
const { category, artwork } = route.params as unknown as Params
const currentCategory = findCategoryById(category);

const title = computed(() => {
  return `${currentCategory?.title} ${currentCategory?.period}`;
});

/**
 * Image processing
 */
const artworkImage = computed(() => {
  if (!currentArtwork?.image) {
    return '';
  }

  const identifier = process.server ? Buffer.from(currentArtwork.image, 'base64') : btoa(currentArtwork.image);
  // https://images.diaries.amsterdamtimemachine.nl/iiif/urn-gvn-EVDO01-IIAV002_IAV001000030-large_03.jpg/749,12,729,618/max/0/default.jpg
  return `http://localhost:3000/images/${identifier}/full/max/0/default.jpg`;

});

/**
 * Description handlers
 */
const descriptionContainer = ref();
const titleElement = ref();
const maxLines = ref(5);

const calculateDescription = () => {
  const containerHeight = descriptionContainer.value?.getBoundingClientRect()?.height || 0;
  const titleHeight = titleElement.value?.getBoundingClientRect()?.height || 0;
  // Note: the 16 here equals the mt-4, which is a margin-top of 1 rem;
  const availableSpace = containerHeight - titleHeight - 16;
  const value = Math.floor(availableSpace / 18);
  maxLines.value = value > 10 ? 10 : value;
}

const visualizeDescription = computed(() => {
 return ['text-sm', 'mt-4', maxLines.value < 3 ? 'hide-element' : `truncate-lines-${maxLines.value}`];
});

// Find the current artwork
const currentArtwork = findById(artwork, category);

// Nav paths for the navigation buttons
const navPath = (prev: Boolean = false) => {
  const propName = prev ? 'prev' : 'next'
  return { name: route.name, params: { category: category, artwork: state[propName]?.id } };
};

/**
 * Based on the direction of the component and the key pressed, trigger navigation
 */
const eventHandler = (evt: KeyboardEvent) => {
  if (['ArrowLeft', 'ArrowRight'].includes(evt.key)) {
    const path = navPath(evt.key === 'ArrowLeft');
    const direction = (evt.key === 'ArrowLeft') ? 'right' : 'left';
    if (path.params.artwork) {
      $navigate(path);
    }
  }
};

// Add resize handler to handle the calculation of the description height
const resizeHandler = useDebounce(calculateDescription, 250);

onMounted(() => {
  document.addEventListener('keyup', eventHandler);
  window.addEventListener('resize', resizeHandler);
  calculateDescription();
});

onUnmounted(() => {
  document.removeEventListener('keyup', eventHandler);
  window.removeEventListener('resize', resizeHandler);
});

// Check if the total artworks changed to update the next/prev buttons
watch(totalArtworks, x => {
  state.next = findNext(artwork, category);
  state.prev = findPrev(artwork, category);
}, { immediate: true });

// Check if we need to load more artworks
loadNext(artwork, category);
</script>

<style scoped lang="scss">
.page {
  grid-template-rows: min-content 1fr;
}
.image-container {
  background-color: #F8FAFB;
}
</style>
