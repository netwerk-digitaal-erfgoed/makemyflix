export default async (image: UploadedImage): Promise<void> => {
  const config = useRuntimeConfig();
  await $fetch<UploadedImage[]>(`${config.app.backendUrl}/upload/files/${image.id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${config.app.token}`,
    },
  });
};
