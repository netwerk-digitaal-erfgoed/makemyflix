export default defineEventHandler<Promise<UploadedImage | null>>(async event => {
  const {
    public: { backendUrl },
    token,
  } = useRuntimeConfig();
  const formData = await readFormData(event);

  const response = await $fetch<UploadedImage[]>(`${backendUrl}/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  return response?.[0] ?? null;
});
