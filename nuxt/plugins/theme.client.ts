export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.hook('app:beforeMount', async () => {
    useThemeStore().setThemeStyling();
  });
});
