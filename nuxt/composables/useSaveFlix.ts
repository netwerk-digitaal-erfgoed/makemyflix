export default async (body: Record<string, any>, id?: string) => {
  const config = useRuntimeConfig();
  const url = `${config.app.backendUrl}/flixes${id ? `/${id}` : ''}`;
  const method: 'POST' | 'PUT' = id ? 'PUT' : 'POST';

  try {
    const response: any = await $fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.app.token}`,
      },
      body: JSON.stringify({ data: body }),
    });
    return response.data;
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
