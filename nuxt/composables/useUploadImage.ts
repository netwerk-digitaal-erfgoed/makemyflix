export default async (file: File | UploadedImage | null | undefined): Promise<UploadedImage | null> => {
  if (!(file instanceof File)) {
    return file ?? null;
  }
  const formData = new FormData();
  formData.append('files', file);

  return $fetch<UploadedImage>(`/api/images`, {
    method: 'POST',
    body: formData,
  });
};
