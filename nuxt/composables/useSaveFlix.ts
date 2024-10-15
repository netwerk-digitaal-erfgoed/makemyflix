export default async (body: Record<string, any>, id?: string) => {
  const url = `/api/flixes${id ? `/${id}` : ''}`;
  const method: 'POST' | 'PUT' = id ? 'PUT' : 'POST';

  try {
    const response: any = await $fetch(url, {
      method,
      body,
    });
    return response;
  } catch (error: any) {
    if (error.status === 400) {
      let messages: string[] = [error.data.error.message];
      if (Array.isArray(error.data.error.details.errors)) {
        messages = error.data.error.details.errors.map((error: any) => error.message);
      }

      return {
        error: true,
        messages,
      };
    }
    console.error('Error while saving flix:', error);
    return undefined;
  }
};
