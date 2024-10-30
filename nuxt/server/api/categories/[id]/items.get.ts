import { generateHeaders } from '~/server/utils/generateHeaders';

export default defineEventHandler<Promise<Artwork[]>>(async event => {
  const {
    public: { backendUrl },
  } = useRuntimeConfig();
  const headers = generateHeaders(event);
  const categoryId = getRouterParam(event, 'id') as string;
  const { limit, page } = getQuery(event);

  const artworks = await $fetch<Artwork[]>(`${backendUrl}/categories/${categoryId}/items`, {
    params: {
      limit: limit || 16,
      page: page || 0,
    },
    headers,
  });
  return artworks.map(artwork => ({ ...artwork, categoryId }));
});
