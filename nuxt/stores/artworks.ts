const defaultPageSize = 16;

export const useArtworkStore = defineStore('artworks', () => {
  const { currentFlix } = storeToRefs(useFlixStore());
  const artworks = ref<Artwork[]>([]);
  const totalArtworks = computed(() => artworks.value.length);

  function findBySlug(slug: string): Artwork | undefined {
    return artworks.value.find((art: Artwork) => art.slug === slug);
  }

  function findPrev(artworkId: string): Artwork | undefined {
    const idx = findIndex(artworkId);
    return artworks.value[idx - 1];
  }

  function findNext(artworkId: string): Artwork | undefined {
    const idx = findIndex(artworkId);
    return artworks.value.find((art: Artwork, index: number) => {
      return index > idx;
    });
  }

  function findByCategory(categoryId: string, limit: number = defaultPageSize, page: number = 0): Artwork[] {
    const start = page * limit;
    const end = (page + 1) * limit;
    return artworks.value.filter((art: Artwork) => art.categoryId === categoryId).slice(start, end);
  }

  async function listOrFetchByCategory(
    categoryId: string,
    limit: number = defaultPageSize,
    page: number = 0,
  ): Promise<Artwork[]> {
    let artworks = findByCategory(categoryId, limit, page);

    if (!artworks.length) {
      await fetchByCategory(categoryId, limit, page);
      artworks = findByCategory(categoryId, limit, page);
    }

    return artworks;
  }

  async function loadNext(artworkId: string, categoryId: string): Promise<void> {
    const idx = findIndex(artworkId);
    const total = totalByCategory(categoryId);
    if (idx > total - 3) {
      await fetchByCategory(categoryId, defaultPageSize, total / defaultPageSize);
    }
  }

  function resetData(): void {
    artworks.value = [];
  }

  /**
   * Private Functions
   */
  function findIndex(artworkId: string): number {
    return artworks.value.findIndex((art: Artwork) => art.id === artworkId);
  }

  function totalByCategory(categoryId: string): number {
    return artworks.value.filter((art: Artwork) => art.categoryId === categoryId).length;
  }

  async function fetchByCategory(categoryId: string, limit: number = defaultPageSize, page: number = 0): Promise<void> {
    console.warn('Artworks.ts#fetchByCategory');
    const { updateCategory, findCategoryById } = useCategoryStore();
    const category = findCategoryById(categoryId);

    // Only fetch if we have the category
    if (category && currentFlix.value?.uri) {
      const response =
        ((await $fetch(`/api/categories/${categoryId}/items?limit=${limit}&page=${page}`, {
          headers: { uri: currentFlix.value?.uri },
        }).catch(error => console.error(error))) as Artwork[]) || [];
      artworks.value.push(...response);

      // Update the category if needed
      if (response.length && !category.image) {
        updateCategory({ ...category, image: response[0].image });
      }
    }
  }

  return {
    totalArtworks,
    artworks,
    findBySlug,
    findByCategory,
    listOrFetchByCategory,
    loadNext,
    findNext,
    findPrev,
    resetData,
  };
});
