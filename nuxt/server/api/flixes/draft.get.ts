export default defineEventHandler<Promise<Flix | undefined>>(async event => {
  const {
    public: { backendUrl },
    token,
  } = useRuntimeConfig();
  const { token: urlToken } = getQuery(event);

  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
  };
  if (urlToken) {
    headers['X-token'] = urlToken as string;
  }

  return $fetch<Flix>(`${backendUrl}/draft`, {
    headers,
  });
});
