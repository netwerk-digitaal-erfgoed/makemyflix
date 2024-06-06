import { defineStore } from 'pinia';

export const useCategoryStore = defineStore('categories', () => {
  const categories = ref<Category[]>([]);
  const { app: { backendUrl, token } } = useRuntimeConfig();
  const { currentFlix } = useFlixStore();

  function updateCategory(category: Category): void {
    const idx = categories.value.findIndex((cat: Category) => cat.id === category.id);
    categories.value.splice(idx, 1, category);
  }

  function findCategoryById (id: string): Category | undefined {
    return categories.value.find((cat: Category) => cat.id === id);
  }

  async function listOrFetchCategories (): Promise<Category[]> {
    if (!categories.value.length) {
      await fetchCategories();
    }
    return categories.value.slice();
  }

  /**
   * Private functions
   */
  async function fetchCategories (): Promise<void> {
    console.warn('Categories.ts#fetchCategories');
    if (!currentFlix?.uri) {
      return;
    }

    categories.value = await $fetch(`${backendUrl}/categories`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'X-flix': currentFlix.uri
      }
    });
  }

  return { categories, updateCategory, findCategoryById, listOrFetchCategories };
});
