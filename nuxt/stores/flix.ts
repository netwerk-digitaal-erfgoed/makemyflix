export const useFlixStore = defineStore('flix', () => {
  /**
   * State
   */
  const currentFlix = ref<Flix>();
  const config = useRuntimeConfig();

  /**
   * Computed Properties
   */
  const branding = computed<Branding | undefined>(() => {
    return currentFlix.value?.branding;
  });

  const sidenote = computed<string | undefined>(() => {
    return currentFlix.value?.sidenote;
  });

  /**
   * Methods
   */
  const generateLabel = (label: string) => {
    const { labels } = currentFlix.value ?? {};
    return labels?.[label] ?? '';
  };

  const setupFlix = async (flix: string) => {
    // Construct the flexUri
    const flexUri = `${window.location.origin}/${flix}`;

    // Check if the flexUri is the currentFlex, if so do nothing
    if (currentFlix.value?.uri === flexUri) {
      return;
    }

    // Origin path is not retrievable from the backend so we need to pass it
    const setup: Flix = await $fetch(`${config.app.backendUrl}/setup`, {
      headers: {
        Authorization: `Bearer ${config.app.token}`,
        'X-flix': flexUri,
      },
    });
    // Add the flexUri for the guard
    setup.uri = flexUri;
    setup.id = flix;

    // Update the current flix
    currentFlix.value = setup;
  };

  return {
    currentFlix,
    branding,
    sidenote,
    setupFlix,
    generateLabel,
  };
});
