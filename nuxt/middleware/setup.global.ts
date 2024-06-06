export default defineNuxtRouteMiddleware(async (to) => {
  await useFlixStore().setupFlix(to.params.flix as string);
});
