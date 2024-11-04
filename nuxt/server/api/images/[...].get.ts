export default defineEventHandler(event => {
  const {
    public: { backendUrl },
  } = useRuntimeConfig();
  const url = `${backendUrl}/images/${event.context.params!._}`;
  // Note use the normal fetch instead of $fetch, so 302 from strapi are correctly handled
  return fetch(url, {
    redirect: 'manual',
  });
});
