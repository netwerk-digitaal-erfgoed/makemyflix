export const useFlixStore = defineStore('flix', () => {
  /**
   * State
   */
  const currentFlix = ref<Flix>();
  const config = useRuntimeConfig();
  const newFlix = ref<FlixData>({});

  /**
   * Computed Properties
   */
  const branding = computed<Branding | undefined>(() => {
    return currentFlix.value?.branding;
  });

  const sidenote = computed<string | undefined>(() => {
    return currentFlix.value?.sidenote;
  });

  const supportIIIF = computed<boolean>(() => {
    return currentFlix.value?.fallback ?? false;
  });

  /**
   * Methods
   */
  const generateLabel = (label: string) => {
    const { labels } = currentFlix.value ?? {};
    return labels?.[label] ?? '';
  };

  const fetchFlixes = async (): Promise<Flix[]> => {
    try {
      const { data }: any = await $fetch(`${config.app.backendUrl}/flixes`, {
        headers: {
          Authorization: `Bearer ${config.app.token}`,
        },
      });
      return data.map((entry: any) => {
        const uri = entry.attributes.uri;
        const path = uri.replace(window.location.origin, '');
        const title = path.replace(/^\/(.)/, (_: any, char: string) => char.toUpperCase());

        return {
          id: entry.id,
          path,
          title,
        };
      });
    } catch (error) {
      console.error('Error fetching flixes:', error);
      return [];
    }
  };

  const resetData = () => {
    currentFlix.value = undefined;
    useArtworkStore().resetData();
    useCategoryStore().resetData();
    useThemeStore().resetData();
  };

  const setupFlix = async (flix: string) => {
    // Construct the flexUri
    const flexUri = `${window.location.origin}/${flix}`;

    // Check if the flexUri is the currentFlex, if so do nothing
    if (currentFlix.value?.uri === flexUri) {
      return;
    }

    // Reset the currentFlix
    resetData();

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

    // Set the theming
    useThemeStore().setThemeStyling();

    // Set SEO
    useSetSeo(currentFlix.value.seo);
  };

  return {
    currentFlix,
    newFlix,
    branding,
    sidenote,
    supportIIIF,
    setupFlix,
    fetchFlixes,
    generateLabel,
  };
});
