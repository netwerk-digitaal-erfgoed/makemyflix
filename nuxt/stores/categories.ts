import { defineStore } from 'pinia';
import { useQueriesStore } from '@/stores/queries';

export const useCategoryStore = defineStore('categories', () => {
  const categories = ref<Category[]>([]);

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
    const { getCategoryQuery } = useQueriesStore();
    categories.value = (await getCategoryQuery() || []).map((category: CategoryResponse) => {
      return {
        id: useSlugify(category.name),
        originalId: category.id,
        title: useCapitalize(category.name),
        description: category.description,
        period: usePeriodName(category?.startDate, category?.endDate),
        numberOfArtworks: parseInt(category.numberOfHeritageObjects, 10)
      };
    });
  }

  return { categories, updateCategory, findCategoryById, listOrFetchCategories };
});
