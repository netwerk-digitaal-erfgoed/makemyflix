import { generateHeaders } from '~/server/utils/generateHeaders';

export default defineEventHandler(async event => {
  const {
    public: { backendUrl },
  } = useRuntimeConfig();
  const body = await readBody(event);
  const headers = generateHeaders(event);
  const url = `${backendUrl}/flixes${body.id ? `/${body.id}` : ''}`;
  const method = body.id ? 'PUT' : 'POST';
  const { data } = await $fetch<StrapiApiResponse<StrapiEntity<Flix>>>(url, {
    method,
    headers,
    body: JSON.stringify({ data: body }),
  });

  return {
    flix: {
      ...body,
      id: data.id,
    },
    hash: data.attributes.hash, // TODO: We should change this
  };
});
