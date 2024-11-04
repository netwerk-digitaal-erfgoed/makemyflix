/**
 * Middleware which will redirect a user to the category page
 * when the artwork isn't in the store/cache
 */
export default defineNuxtRouteMiddleware(to => {
  const { category, artwork } = to.params as unknown as Params;
  const { currentFlix } = useFlixStore();
  const artworkStore = useArtworkStore();
  const currentArtwork = artworkStore.findBySlug(artwork);

  // If we have a current artwork, do nothing
  if (currentArtwork) {
    return;
  }

  // If we have a currentFlix and a category, navigate to that
  if (currentFlix && category) {
    return navigateTo(`${currentFlix!.uri}/${category}`, { external: true });
  }

  // Worst case scenario, navigate to the home page
  return '/';
});
