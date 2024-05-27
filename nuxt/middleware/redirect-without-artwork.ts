import { useArtworkStore } from "@/stores/artworks";

/**
 * Middleware which will redirect a user to the category page
 * when the artwork isn't in the store/cache
 */
export default defineNuxtRouteMiddleware((to, from) => {
  const { category, artwork } = to.params as unknown as Params;
  const artworkStore = useArtworkStore();
  const currentArtwork = artworkStore.findById(artwork, category);

  if (currentArtwork) {
    return;
  }
  return navigateTo({ name: 'category', params: { category: category } });
});
