export default async (body: Record<string, any>) => {
  const headers = useGenerateHeaders();
  const isUpdate = !!body.id && !!headers['x-token'];
  const url = `/api/flixes${isUpdate ? `/${body.id}` : ''}`;
  const method = isUpdate ? 'PUT' : 'POST';

  // If it's an update, we should remove the id from the body and force the use of x-token
  // If the token is undefined the call will fail
  if (isUpdate) {
    delete body.id;
    delete body.hash;
  }

  try {
    const response: any = await $fetch(url, {
      method,
      headers,
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
