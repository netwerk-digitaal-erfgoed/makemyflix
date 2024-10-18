import { generateHeaders } from '~/server/utils/generateHeaders';

export default defineEventHandler<Promise<Flix | void>>(async event => {
  const {
    public: { backendUrl },
  } = useRuntimeConfig();
  const headers = generateHeaders(event);

  if (headers['x-flix']) {
    return $fetch<Flix>(`${backendUrl}/flixes`, {
      headers,
    });
  }
  return;
});
