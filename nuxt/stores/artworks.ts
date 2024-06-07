import { defineStore } from 'pinia'
import { useCategoryStore } from "@/stores/categories";

const defaultPageSize = 16;

export const useArtworkStore = defineStore('artworks', () => {
  const { app: { backendUrl, token } } = useRuntimeConfig();
  const { currentFlix } = useFlixStore();
  const artworks = ref<Artwork[]>([]);
  const totalArtworks = computed(() => artworks.value.length);

  function findById (id: string, categoryId: string): Artwork | undefined {
    return artworks.value.find((art: Artwork) => art.id === id && art.categoryId === categoryId);
  }

  function findPrev (artworkId: string, categoryId: string): Artwork | undefined {
    const idx = findIndex(artworkId, categoryId);
    return artworks.value.find((art: Artwork, index: number) => {
      return art.categoryId === categoryId && index === (idx - 1);
    });
  }

  function findNext (artworkId: string, categoryId: string): Artwork | undefined {
    const idx = findIndex(artworkId, categoryId);
    return artworks.value.find((art: Artwork, index: number) => {
      return art.categoryId === categoryId && index > idx;
    });
  }

  function findByCategory (categoryId: string, limit: number = defaultPageSize, page: number = 0): Artwork[] {
    const start = page * limit;
    const end = (page + 1) * limit;
    return artworks
      .value
      .filter((art: Artwork) => art.categoryId === categoryId)
      .slice(start, end);
  }

  async function listOrFetchByCategory (categoryId: string, limit: number = defaultPageSize, page: number = 0): Promise<Artwork[]> {
    let artworks = findByCategory(categoryId, limit, page);

    if (!artworks.length) {
      await fetchByCategory(categoryId, limit, page);
      artworks = findByCategory(categoryId, limit, page);
    }

    return artworks;
  }

  async function loadNext (artworkId: string, categoryId: string): Promise<void> {
    const idx = findIndex(artworkId, categoryId);
    const total = totalByCategory(categoryId);
    if (idx > (total - 3)) {
      await fetchByCategory(categoryId, defaultPageSize, (total / defaultPageSize));
    }
  }

  /**
   * Private Functions
   */
  function findIndex (artworkId: string, categoryId: string): number {
    return artworks.value.findIndex((art: Artwork) => art.id === artworkId && art.categoryId === categoryId);
  }

  function totalByCategory (categoryId: string): number {
    return artworks.value.filter((art: Artwork) => art.categoryId === categoryId).length;
  }

  function countById (): Record<string, number> {
    return artworks.value.reduce((collection: Record<string, number>, currentValue: Artwork) => {
      const id = currentValue.id.replace(/(.*)-\d*/i, "$1");
      collection[id] = (id in collection) ? collection[id] + 1 : 1;
      return collection;
    }, {});
  }

  async function fetchByCategory (categoryId: string, limit: number = defaultPageSize, page: number = 0): Promise<void> {
    console.warn('Artworks.ts#fetchByCategory');
    const { updateCategory, findCategoryById } = useCategoryStore();
    const category = findCategoryById(categoryId);

    // Only fetch if we have the category
    if (category && currentFlix?.uri) {
      const response = (await $fetch(`${backendUrl}/items`, {
        params: {
          categoryId: category.originalId,
          categorySlug: categoryId,
          limit,
          page,
        },
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-flix': currentFlix.uri
        }
      }).catch(error => console.error(error))) as Artwork[] || [];
      const counts = countById();
      artworks.value.push(...response.map((input): Artwork => {
        const id = input.id;
        // TODO: Might need refactoring. Not sure if this part is needed. The way it's setup, this can only be done from the client, not from strapi
        const suffix = counts[id] ? `-${counts[id]}` : '';
        counts[id] = (id in counts) ? counts[id] + 1 : 1;
        return { ...input, id: `${id}${suffix}` };
      }));

      // Update the category if needed
      if (response.length && !category.image) {
        updateCategory({...category, image: response[0].image});
      }
    }
  }

  return {
    totalArtworks,
    artworks,
    findById,
    findByCategory,
    listOrFetchByCategory,
    loadNext,
    findNext,
    findPrev
  };
});
