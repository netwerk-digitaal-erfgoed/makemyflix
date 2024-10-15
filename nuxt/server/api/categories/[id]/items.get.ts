export default defineEventHandler<Promise<Artwork[]>>(async event => {
  const {
    public: { backendUrl },
    token,
  } = useRuntimeConfig();

  const categoryId = getRouterParam(event, 'id') as string;
  const { limit, page, uri } = getQuery(event);

  const artworks = await $fetch<Artwork[]>(`${backendUrl}/categories/${categoryId}/items`, {
    params: {
      limit: limit || 16,
      page: page || 0,
    },
    headers: {
      Authorization: `Bearer ${token}`,
      'X-flix': uri as string,
    },
  });
  return artworks.map(artwork => ({ ...artwork, categoryId }));
});
