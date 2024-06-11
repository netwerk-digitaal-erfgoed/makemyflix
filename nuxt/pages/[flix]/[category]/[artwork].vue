<template>
  <div
    class="page"
    :class="transition">
    <MoleculesHeader
      :title="title"
      :showCategory="true"
      class="header" />
    <div class="content">
      <MoleculesIconNavigation
        name="arrowLeft"
        :to="navPath(true)"
        v-if="state.prev"
        class="navigation-arrow-left" />
      <div class="artwork-container">
        <AtomsImage
          v-if="currentArtwork?.image"
          :identifier="currentArtwork.image"
          class="artwork" />
      </div>
      <div
        class="description"
        ref="descriptionContainer">
        <h2
          class="title"
          ref="titleElement">
          {{ currentArtwork?.title }}
        </h2>
        <div :class="visualizeDescription">{{ currentArtwork?.description }}</div>
      </div>
      <div class="properties">
        <AtomsPropertyGroup
          v-for="(prop, name) in currentArtwork?.properties"
          :key="name"
          :label="name.toString()"
          :prop="prop"
          :groupName="name.toString()" />
      </div>
      <MoleculesIconNavigation
        name="arrowRight"
        :to="navPath()"
        v-if="state.next"
        class="navigation-arrow-right" />
    </div>
  </div>
</template>

<script setup lang="ts">
// Transition settings
definePageMeta({
  middleware: ['redirect-without-artwork'],
  pageTransition: {
    name: 'slide',
    mode: 'in-out',
    duration: 1000,
    onBeforeEnter() {
      useNoScroll();
    },
    onAfterEnter() {
      useScroll();
    },
    onBeforeLeave() {
      useNoScroll();
    },
    onAfterLeave() {
      useScroll();
    },
  },
});

const { $navigate } = useNuxtApp();
const state = reactive<{ next?: Artwork; prev?: Artwork }>({
  next: undefined,
  prev: undefined,
});

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
const { category, artwork } = route.params as unknown as Params;
const currentCategory = findCategoryById(category);

const title = computed(() => {
  return `${currentCategory?.title} ${currentCategory?.period}`;
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
};

const visualizeDescription = computed(() => {
  return ['text-sm', 'mt-4', maxLines.value < 3 ? 'hide-element' : `truncate-lines-${maxLines.value}`];
});

// Find the current artwork
const currentArtwork = findById(artwork, category);

// Nav paths for the navigation buttons
const navPath = (prev: boolean = false): To => {
  const propName = prev ? 'prev' : 'next';
  const params: Partial<Params> = {
    category,
  };
  if (state[propName]?.id) {
    params.artwork = state[propName]?.id;
  }

  return {
    name: route.name as string,
    params,
  };
};

/**
 * Based on the direction of the component and the key pressed, trigger navigation
 * TODO: Why not trigger click on the corresponding element.
 */
const eventHandler = (evt: KeyboardEvent) => {
  if (['ArrowLeft', 'ArrowRight'].includes(evt.key)) {
    const path = navPath(evt.key === 'ArrowLeft');
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
watch(
  totalArtworks,
  () => {
    state.next = findNext(artwork, category);
    state.prev = findPrev(artwork, category);
  },
  { immediate: true },
);

// Check if we need to load more artworks
loadNext(artwork, category);
</script>

<style scoped lang="scss">
.page {
  position: absolute;
  z-index: 10;
  background-color: var(--white);
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: min-content 1fr;
  grid-template-areas: 'header' 'content';

  .header {
    grid-area: header;
  }

  .content {
    grid-area: content;
    height: 100%;
    width: 100%;
    overflow: hidden;
    display: grid;
    grid-template-rows: repeat(12, minmax(0, 1fr));
    grid-template-columns: repeat(12, minmax(0, 1fr));
    grid-template-areas:
      'b c c c c c c c c c c f'
      'b c c c c c c c c c c f'
      'b c c c c c c c c c c f'
      'b c c c c c c c c c c f'
      'b c c c c c c c c c c f'
      'b c c c c c c c c c c f'
      'b c c c c c c c c c c f'
      'b c c c c c c c c c c f'
      '. d d d d d d p p p p .'
      '. d d d d d d p p p p .'
      '. d d d d d d p p p p .'
      '. d d d d d d p p p p .';

    .navigation-arrow-left {
      grid-area: b;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .artwork-container {
      grid-area: c;
      background-color: var(--artwork-container-background);
      display: flex;
      justify-content: center;
      align-items: center;

      .artwork {
        width: auto;
        max-height: 100%;
        max-width: 100%;
      }
    }

    .description {
      grid-area: d;
      display: flex;
      flex-direction: column;
      margin: var(--space-4);
      margin-right: 0;

      .title {
        font-size: var(--font-size-2xl);
      }
    }

    .properties {
      grid-area: p;
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      padding: var(--space-8);
      row-gap: var(--space-4);
      height: min-content;
    }

    .navigation-arrow-right {
      grid-area: f;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
