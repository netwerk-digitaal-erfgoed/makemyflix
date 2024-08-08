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

  const fetchFlixes = async () => {
    try {
      const { data } = await $fetch<StrapiApiResponse<StrapiEntity<Flix>[]>>(`${config.app.backendUrl}/flixes`, {
        headers: {
          Authorization: `Bearer ${config.app.token}`,
        },
      });

      return data.map(entry => {
        const uri = entry.attributes.uri;
        const path = uri?.replace(window.location.origin, '') ?? '';
        const title = path?.replace(/^\/(.)/, (_: any, char: string) => char.toUpperCase()) ?? '';

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

  const getSlugFromFlix = (flix: Flix | FlixData) => {
    const uri = flix.uri;
    if (!uri) {
      return undefined;
    }
    return uri.replace(window.location.origin, '').split('/').filter(Boolean)[0];
  };

  const fetchFlix = async (flixUri: string) => {
    try {
      const flix = await $fetch<Flix | null>(`${config.app.backendUrl}/setup`, {
        headers: {
          Authorization: `Bearer ${config.app.token}`,
          'X-flix': flixUri,
        },
      });

      if (!flix) {
        return null;
      }

      return flix;
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const setupFlix = async (flix: string, preview = false) => {
    // Construct the flixUri
    const flixUri = `${window.location.origin}/${flix}`;

    // Check if the flixUri is the currentFlix, if so do nothing
    if (currentFlix.value?.uri === flixUri) {
      return;
    }

    // Reset the currentFlix
    resetData();

    // Origin path is not retrievable from the backend so we need to pass it
    const setup = await fetchFlix(flixUri);
    if (!setup) {
      return;
    }

    // Add the flixUri for the guard
    setup.id = flix;
    setup.uri = flixUri;

    // Update the current flix
    currentFlix.value = setup;

    // Set the theming
    useThemeStore().setThemeStyling(preview);

    // Set SEO
    useSetSeo(currentFlix.value.seo);
  };

  return {
    currentFlix,
    branding,
    sidenote,
    supportIIIF,
    fetchFlix,
    setupFlix,
    fetchFlixes,
    generateLabel,
    resetData,
    getSlugFromFlix,
  };
});
