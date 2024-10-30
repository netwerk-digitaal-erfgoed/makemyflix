/**
 * Middleware which will redirect a user to the category page
 * when the artwork isn't in the store/cache
 */
export default defineNuxtRouteMiddleware(to => {
  const { category, artwork } = to.params as unknown as Params;
  const { currentFlix } = useFlixStore();
  const artworkStore = useArtworkStore();
  const currentArtwork = artworkStore.findBySlug(artwork);

  if (currentArtwork) {
    return;
  }

  // Note: We add the flix here since it's not going through AtomsNavigation
  return navigateTo({
    name: 'flix-category',
    params: {
      flix: currentFlix!.id,
      category,
    },
  });
});
