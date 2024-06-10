export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:beforeMount', async () => {
    const { setFonts, setThemeStyling } = useThemeStore();
    setFonts();
    setThemeStyling();
  });
});
