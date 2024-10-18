export default async (body: Record<string, any>) => {
  try {
    const headers = useGenerateHeaders();
    const response: any = await $fetch('/api/flixes', {
      method: 'POST',
      headers,
      body,
    });
    return response;
  } catch (error: any) {
    console.error('Error while saving flix:', error);
    return {};
  }
};
