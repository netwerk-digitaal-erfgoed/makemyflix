<template>
  <div class="page">
    <MoleculesHeader
      :title="title"
      dark-mode
      class="header" />
    <AtomsImage
      v-if="categoryImage"
      :identifier="categoryImage"
      class="cover-image"
      size="1000,256" />

    <section class="section">
      <div class="container">
        <template v-if="state.category?.numberOfArtworks">
          <div class="row">
            <AtomsArtworkTeaser
              v-for="artwork in state.artworks"
              :key="artwork.id"
              :artwork="artwork"
              :to="artworkPath(artwork.slug)" />
          </div>

          <AtomsObserver
            v-show="hasMore"
            class="observer"
            threshold="0.75"
            @intersect="loadMore">
            <AtomsLoader class="loader" />
          </AtomsObserver>
        </template>
        <div v-else>No artworks</div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
/**
 * Store deps
 */
const { findCategoryBySlug } = useCategoryStore();
const { listOrFetchByCategory } = useArtworkStore();

/**
 * State & Props
 * Note: Needed for transition to art page
 */
definePageMeta({
  pageTransition: {
    name: 'page',
    mode: 'in-out',
    duration: 1000,
  },
});

// TODO: Just replace this with refs.
const state = reactive<ArtworkState>({
  pageSize: 16,
  page: 0,
  artworks: [],
  category: {} as Category,
});

// Load the category
const route = useRoute();
const category = route.params.category as string;
state.category = await findCategoryBySlug(category);
if (state.category) {
  state.artworks = await listOrFetchByCategory(state.category.id, state.pageSize, state.page);
}

/**
 * Computed Properties
 */
const title = computed(() => {
  return `${state.category?.title} ${state.category?.period}`;
});

const categoryImage = computed(() => {
  return state.category?.image;
});

const hasMore = computed(() => {
  return (state.category?.numberOfArtworks || 0) > state.artworks.length;
});

/**
 * Methods
 */
const artworkPath = (artworkSlug: string) => {
  return {
    name: 'flix-category-artwork',
    params: {
      category,
      artwork: artworkSlug,
    },
  };
};

const loadMore = async () => {
  if (state.category) {
    state.page += 1;
    state.artworks.push(...(await listOrFetchByCategory(state.category.id, state.pageSize, state.page)));
  }
};
</script>

<style scoped lang="scss">
.page {
  @include flex-column;
  min-height: 100vh;

  .header {
    position: fixed;
    top: 0;
  }

  .cover-image {
    height: var(--cover-image-height);
    width: 100%;
    object-fit: cover;
  }

  .section {
    display: flex;
    justify-content: center;
    padding-block: var(--space-24);
    flex: 1 1 auto;

    .container {
      width: 83.33%;

      .row {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        column-gap: var(--space-12);
        row-gap: var(--space-14);

        @media (min-width: 992px) {
          grid-template-columns: repeat(2, 1fr);
        }

        @media (min-width: 1200px) {
          grid-template-columns: repeat(3, 1fr);
        }

        @media (min-width: 1400px) {
          grid-template-columns: repeat(4, 1fr);
        }
      }

      .observer {
        display: flex;
        justify-content: center;
        align-items: center;
        height: var(--space-10);
        margin-top: var(--space-3);

        .loader {
          height: var(--space-3);
        }
      }
    }
  }
}
</style>
