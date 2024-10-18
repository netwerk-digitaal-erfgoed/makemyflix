import { generateHeaders } from '~/server/utils/generateHeaders';

export default defineEventHandler<Promise<Category[]>>(async event => {
  const {
    public: { backendUrl },
  } = useRuntimeConfig();
  const headers = generateHeaders(event);
  const categories = await $fetch<Category[]>(`${backendUrl}/categories`, {
    headers,
  });
  return Array.isArray(categories) ? categories : [];
});
