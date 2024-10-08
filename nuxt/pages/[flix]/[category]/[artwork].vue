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
        icon="mdi:arrow-left"
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
        icon="mdi:arrow-right"
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
const { findCategoryBySlug } = useCategoryStore();
const artworkStore = useArtworkStore();
const { findBySlug, loadNext, findNext, findPrev } = artworkStore;
const { totalArtworks } = storeToRefs(artworkStore);

// Find the current category
const route = useRoute();
const { category, artwork } = route.params as unknown as Params;
const currentCategory = await findCategoryBySlug(category);

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
  return ['description-content', maxLines.value < 3 ? 'hide-element' : `truncate-lines-${maxLines.value}`];
});

// Find the current artwork
const currentArtwork = findBySlug(artwork);

// Nav paths for the navigation buttons
const navPath = (prev: boolean = false): To => {
  const propName = prev ? 'prev' : 'next';
  const params: Partial<Params> = {
    category: currentCategory?.slug,
  };
  if (state[propName]?.slug) {
    params.artwork = state[propName]!.slug;
  }

  return {
    name: route.name as string,
    params,
  };
};

/**
 * Based on the direction of the component and the key pressed, trigger navigation
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
    if (currentArtwork) {
      state.next = findNext(currentArtwork.id);
      state.prev = findPrev(currentArtwork.id);
    }
  },
  { immediate: true },
);

// Check if we need to load more artworks
if (currentArtwork && currentCategory) {
  loadNext(currentArtwork.id, currentCategory.id);
}
</script>

<style scoped lang="scss">
.page {
  position: absolute;
  z-index: 30;
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: min-content 1fr;
  grid-template-areas: 'header' 'content';
  background-color: var(--background-color);

  .header {
    grid-area: header;
  }

  .content {
    grid-area: content;
    height: 100%;
    width: 100%;
    overflow: hidden;
    display: grid;
    grid-template-rows: 60vh auto;
    grid-template-columns: 1fr 6fr 4fr 1fr;
    grid-template-areas:
      'b c c f'
      '. d p .';

    .navigation-arrow-left {
      grid-area: b;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .artwork-container {
      grid-area: c;
      background-color: var(--tertiary-color);
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
      @include flex-column;
      grid-area: d;
      margin: var(--space-4);
      margin-right: 0;

      .description-content {
        font-size: var(--font-size-xsm);
        font-weight: var(--font-weight-light);
        margin-top: var(--space-4);
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

@include sm-screen-down {
  .page {
    .content {
      grid-template-rows: 33vh auto auto min-content;
      grid-template-columns: 1fr 1fr;
      grid-template-areas:
        'c c'
        'd d'
        'p p'
        'b f';
      gap: var(--space-4);

      .artwork-container {
        justify-content: center;
        align-items: flex-start;
      }

      .navigation-arrow-left,
      .navigation-arrow-right {
        margin-block: var(--space-4);
      }
    }
  }
}
</style>
