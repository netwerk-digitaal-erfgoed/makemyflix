export const useCategoryStore = defineStore('categories', () => {
  const categories = ref<Category[]>([]);

  function updateCategory(category: Category): void {
    const idx = categories.value.findIndex((cat: Category) => cat.id === category.id);
    categories.value.splice(idx, 1, category);
  }

  function findCategoryById(id: string): Category | undefined {
    return categories.value.find((cat: Category) => cat.id === id);
  }

  async function findCategoryBySlug(slug: string): Promise<Category | undefined> {
    if (categories.value.length === 0) {
      await fetchCategories();
    }

    return categories.value.find((cat: Category) => cat.slug === slug);
  }

  async function listOrFetchCategories(): Promise<Category[]> {
    if (!categories.value.length) {
      await fetchCategories();
    }
    return categories.value.slice();
  }

  function resetData(): void {
    categories.value = [];
  }

  /**
   * Private functions
   */
  async function fetchCategories(): Promise<void> {
    console.warn('Categories.ts#fetchCategories');

    try {
      const headers = useGenerateHeaders();
      categories.value = (await $fetch('/api/categories', { headers })) as Category[];
    } catch (e) {
      console.error(e);
    }
  }

  return {
    categories,
    updateCategory,
    findCategoryById,
    findCategoryBySlug,
    listOrFetchCategories,
    resetData,
  };
});
