import { generateHeaders } from '~/server/utils/generateHeaders';

export default defineEventHandler(async event => {
  const {
    public: { backendUrl },
  } = useRuntimeConfig();
  const body = await readBody(event);
  const headers = generateHeaders(event);
  const url = `${backendUrl}/flixes${body.id ? `/${body.id}` : ''}`;
  const method = body.id ? 'PUT' : 'POST';
  const response = await $fetch<Record<string, any>>(url, {
    method,
    headers,
    body: JSON.stringify({ data: body }),
  });

  if (response?.id) {
    return {
      flix: {
        ...body,
        id: response.id,
      },
      hash: response.hash,
    };
  }
  return response;
});
