import { defineStore } from 'pinia'
import { useCategoryStore } from "@/stores/categories";
import { useQueriesStore } from '@/stores/queries';

const defaultPageSize = 16;

export const useArtworkStore = defineStore('artworks', () => {
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

  function generateTitle ({name, provinceName, contentLocationNames}: ArtworkResponse): string {
    if (name) {
      return name;
    }
    const locationName = contentLocationNames?.split('; ').pop();
    return `${locationName}, ${provinceName}`
  }

  function generateSubtitle ({dateCreated, creatorNames}: ArtworkResponse): string {
    const creatorName = creatorNames?.split('; ').pop();
    return [creatorName, dateCreated]
      .filter(value => value)
      .join(', ');
  }

  function generateName (input: string): string {
    if (input.includes('URI')) {
      return input.replace(/URI/, 'Name');
    } else {
      const hasPluralName = input.slice(-1) === 's';
      const prepend = hasPluralName ? input.slice(0, -1) : input;
      const append = `Name${hasPluralName ? 's' : ''}`;
      return `${prepend}${append}`;
    }
  }

  function generateProperties ({ heritageObject, name, identifier, description, imageURI, publisherHomepage, ...metadata  }: ArtworkResponse): ArtProperties {
    const linkableProps = ['imageLicenseURI', 'provinceURI', 'publisherURI', 'creators', 'contentLocationURIs'];
    return Object.keys(metadata).reduce((collection: ArtProperties, currentValue: string) => {
      // @ts-ignore
      const values = (metadata[currentValue] || '').split('; ');
      const isPublisherURI = currentValue === 'publisherURI';

      // Check if the property is linkable
      if (linkableProps.includes(currentValue)) {
        const name = generateName(currentValue);
        // @ts-ignore
        const names = metadata[name].split('; ');

        const result = values.map((value: any, index: number) => {
          return {
            label: names[index],
            value: (isPublisherURI && !value) ? publisherHomepage : value
          }
        });
        collection[currentValue] = result.length > 1 ? result : result[0];
      } else {
        if (!currentValue.includes('Name')) {
          collection[currentValue] = {
            value: values[0]
          }
        }
      }
      return collection
    }, {});
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
    if (category) {
      const { getItemsQuery } = useQueriesStore();
      const response = await getItemsQuery(limit, page, category.originalId).catch(error => console.error(error)) || [];
      const counts = countById();
      artworks.value.push(...response.map((input: ArtworkResponse): Artwork => {
        const id = input.identifier || useSlugify(input.name || '');
        const suffix = counts[id] ? `-${counts[id]}` : '';
        counts[id] = (id in counts) ? counts[id] + 1 : 1;
        const properties = generateProperties(input);
        return {
          id: `${id}${suffix}`,
          title: generateTitle(input),
          subTitle: generateSubtitle(input),
          description: input.description,
          originalId: input.heritageObject,
          image: input.imageURI,
          categoryId,
          properties
        };
      }));

      // Update the category if needed
      if (response.length && !category.image) {
        updateCategory({...category, image: response[0].imageURI});
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
