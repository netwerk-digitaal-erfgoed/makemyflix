export default async (image: UploadedImage): Promise<void> => {
  await $fetch<UploadedImage[]>(`api/images/${image.id}`, {
    method: 'DELETE',
  });
};
