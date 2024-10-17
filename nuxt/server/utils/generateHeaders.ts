import { H3Event } from 'h3';

export const generateHeaders = (event: H3Event) => {
  const { token } = useRuntimeConfig();
  const requestHeaders = getHeaders(event);
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
  };
  if (requestHeaders['x-token']) {
    headers['x-token'] = requestHeaders['x-token'];
  } else if (requestHeaders['x-flix']) {
    headers['X-flix'] = requestHeaders['x-flix'];
  }
  return headers;
};
