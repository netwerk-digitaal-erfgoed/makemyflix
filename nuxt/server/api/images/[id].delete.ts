export default defineEventHandler(async event => {
  const {
    public: { backendUrl },
    token,
  } = useRuntimeConfig();
  const imageId = getRouterParam(event, 'id') as string;
  return $fetch(`${backendUrl}/upload/files/${imageId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
});
