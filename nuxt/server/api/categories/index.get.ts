export default defineEventHandler<Promise<Category[]>>(async event => {
  const {
    public: { backendUrl },
    token,
  } = useRuntimeConfig();
  const { uri } = getQuery(event);

  const categories = await $fetch<Category[]>(`${backendUrl}/categories`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-flix': uri as string,
    },
  });
  return Array.isArray(categories) ? categories : [];
});
