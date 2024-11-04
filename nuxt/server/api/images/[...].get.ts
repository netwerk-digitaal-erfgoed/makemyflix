export default defineEventHandler(event => {
  const {
    public: { backendUrl },
  } = useRuntimeConfig();
  const url = `${backendUrl}/images/${event.context.params._}`;
  return event.$fetch(url);
});
