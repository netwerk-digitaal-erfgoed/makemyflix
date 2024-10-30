export default defineEventHandler<Promise<StrapiEntity<Flix>>>(async event => {
  const {
    public: { backendUrl },
    token,
  } = useRuntimeConfig();
  const body = await readBody(event);
  const flixId = getRouterParam(event, 'id') as string;

  const { data } = await $fetch<StrapiApiResponse<StrapiEntity<Flix>>>(`${backendUrl}/flixes/${flixId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ data: body }),
  });
  return data;
});
