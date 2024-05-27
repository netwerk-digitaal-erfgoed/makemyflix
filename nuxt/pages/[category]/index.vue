<template>
  <div class="flex flex-col min-h-screen">
    <MoleculesHeader :title="title" dark-mode class="fixed top-0" />
    <img v-if="categoryImage" :src="categoryImage" class="cover-image" />

    <section class="py-24 flex-auto">
      <div class="px-3">
        <div class="flex justify-center">
          <div class="w-10/12">

            <template v-if="state.category?.numberOfArtworks">
              <div
                class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-12 gap-y-14"
              >
                <AtomsArtworkTeaser
                  v-for="artwork in state.artworks"
                  :key="artwork.id"
                  :artwork="artwork"
                  :to="{
                    name: 'category-artwork',
                    params: {
                      category: route.params.category,
                      artwork: artwork.id,
                    },
                  }"
                />
              </div>

              <AtomsObserver v-show="hasMore" class="flex justify-center items-center h-10 mt-3" threshold="0.75" @intersect="loadMore">
                <AtomsLoader class="w-1/10 h-3" />
              </AtomsObserver>
            </template>
            <div v-else>No artworks</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useCategoryStore } from "@/stores/categories";
import { useArtworkStore } from "@/stores/artworks";

const { findCategoryById } = useCategoryStore();
const { listOrFetchByCategory } = useArtworkStore();

// Needed for transition to art page
definePageMeta({
  pageTransition: {
    name: "page",
    mode: "in-out",
    duration: 1000
  }
});

interface State {
  pageSize: number,
  page: number,
  artworks: Artwork[],
  category?: Category
}

// Load the category
const route = useRoute();
const category = route.params.category as string;
const state = reactive<State>({
  pageSize: 16,
  page: 0,
  artworks: [],
  category: {} as Category
});

state.artworks = await listOrFetchByCategory(category, state.pageSize, state.page);
state.category = findCategoryById(category);

const title = computed(() => {
  return `${state.category?.title} ${state.category?.period}`;
});

const categoryImage = computed(() => {
  return state.category?.image;
});

const hasMore = computed(() => {
  return(state.category?.numberOfArtworks || 0) > state.artworks.length;
});

const loadMore = async () => {
  state.page += 1;
  state.artworks.push(...await listOrFetchByCategory(category, state.pageSize, state.page));
};
</script>

<style scoped lang="scss">
.cover-image {
  @apply w-full object-cover;
  height: 16rem;
}
</style>
