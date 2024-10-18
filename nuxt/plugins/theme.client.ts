export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.hook('app:beforeMount', async () => {
    useSetStyling(useFlixStore().currentFlix?.theme);
  });
});
