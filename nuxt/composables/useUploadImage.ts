export default async (file: File | UploadedImage | null | undefined): Promise<UploadedImage | null> => {
  if (!(file instanceof File)) {
    return file ?? null;
  }

  const config = useRuntimeConfig();
  const formData = new FormData();
  formData.append('files', file);

  const response = await $fetch<UploadedImage[]>(`${config.app.backendUrl}/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.app.token}`,
    },
    body: formData,
  });

  return response?.[0] ?? null;
};
