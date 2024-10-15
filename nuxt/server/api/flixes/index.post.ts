export default defineEventHandler<Promise<StrapiEntity<Flix>>>(async event => {
  const {
    public: { backendUrl },
    token,
  } = useRuntimeConfig();
  const body = await readBody(event);

  const { data } = await $fetch<StrapiApiResponse<StrapiEntity<Flix>>>(`${backendUrl}/flixes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ data: body }),
  });
  return data;
});
