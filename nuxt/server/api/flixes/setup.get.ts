export default defineEventHandler<Promise<Flix | null>>(async event => {
  const {
    public: { backendUrl },
    token,
  } = useRuntimeConfig();
  const { uri } = getQuery(event);

  const flix = await $fetch<Flix | null>(`${backendUrl}/setup`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-flix': uri as string,
    },
  });
  return flix ? flix : null;
});
