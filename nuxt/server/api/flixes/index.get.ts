export default defineEventHandler<Promise<StrapiEntity<Flix>[]>>(async () => {
  const {
    public: { backendUrl },
    token,
  } = useRuntimeConfig();

  // TODO: Shouldn't we use generateHeaders here?
  const { data } = await $fetch<StrapiApiResponse<StrapiEntity<Flix>[]>>(`${backendUrl}/flixes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
});
