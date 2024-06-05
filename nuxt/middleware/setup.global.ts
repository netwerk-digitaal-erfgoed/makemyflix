import { useBrandingStore } from '@/stores/branding';
import { useFlixStore } from '~/stores/flix';

export default defineNuxtRouteMiddleware(async (to) => {
  const {
    app: { backendUrl },
  } = useRuntimeConfig();
  const { loadBranding } = useBrandingStore();
  const { path } = storeToRefs(useFlixStore());

  if (path.value === to.params.flix) {
    return;
  }
  path.value = to.params.flix as string;

  // Origin path is not retrievable from the backend so we need to pass it
  const setup: Setup = await $fetch(`${backendUrl}/setup?path=${path.value}`);

  if (setup) {
    const { branding } = setup;
    loadBranding(branding);
    // TODO: Set other data like categories and items
  }
});
