export default defineNuxtRouteMiddleware(async to => {
  if (to.params.flix) {
    await useFlixStore().setupFlix(to.params.flix as string);
  }
});
