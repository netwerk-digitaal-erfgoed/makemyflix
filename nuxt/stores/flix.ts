export const useFlixStore = defineStore('flix', () => {
  /**
   * State
   */
  const currentFlix = ref<Flix>();
  const currentToken = ref<string>();
  const currentViewport = ref<PreviewMediaQuery>('laptop');
  const isPreview = ref(false);

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
    return currentFlix.value?.fallbackIIIF ?? false;
  });

  // TODO: Add extra checks
  const isPublishable = computed<boolean>(() => {
    return !!(currentFlix.value && currentFlix.value.uri);
  });

  /**
   * Methods
   */
  const generateLabel = (label: string) => {
    const { labels } = currentFlix.value ?? {};
    return labels?.[label] ?? '';
  };

  const resetData = () => {
    // Reset the values back to default
    currentFlix.value = undefined;
    currentToken.value = undefined;
    isPreview.value = false;
    currentViewport.value = 'laptop';

    // Also clean up other stores
    useArtworkStore().resetData();
    useCategoryStore().resetData();

    // Reset the styling
    useResetStyling();
  };

  const setupFlix = async (flix: string) => {
    try {
      // Construct the flixUri
      const flixUri = `${window.location.origin}/${flix}`;

      // Check if the flixUri is the currentFlix, if so do nothing
      if (currentFlix.value?.uri === flixUri) {
        return;
      }

      // Reset the currentFlix
      resetData();

      // Origin path is not retrievable from the backend so we need to pass it
      currentFlix.value = await $fetch<Flix>('/api/flixes/setup', { headers: { 'x-flix': flixUri } });

      // Set the theming
      useSetStyling(currentFlix.value.theme!);

      // Set SEO
      useSetSeo(currentFlix.value.seo);
    } catch (e) {
      console.error(e);
    }
  };

  const createDraft = async (token?: string): Promise<void> => {
    try {
      // If the current token is the same as being requested
      // set the preview on true but don't fetch the draft
      if (token && currentToken.value === token) {
        isPreview.value = true;
        return;
      }

      // Reset the current data
      resetData();

      // Generate headers
      const headers = useGenerateHeaders();

      // Update the currentFlix with the draft
      currentFlix.value = await $fetch<Flix>('/api/flixes/draft', { headers });
      isPreview.value = true;
    } catch (error) {
      console.error('Error creating draft:', error);
    }
  };

  const saveDraft = async (publish?: true): Promise<Record<string, any> | undefined> => {
    // No currentFlix to save, just return
    if (!currentFlix.value) {
      return;
    }

    // Check if we are publishing
    currentFlix.value.publishedAt = publish ? useStrapiDate() : null;
    currentFlix.value.status = publish ? 'published' : 'draft';
    isPreview.value = !publish;

    // Save the flix
    const response = await useSaveFlix(currentFlix.value);
    if (response?.flix) {
      currentFlix.value = response.flix;
      currentToken.value = response.hash;
    }
    return response;
  };

  return {
    currentFlix,
    currentViewport,
    isPreview,
    branding,
    sidenote,
    supportIIIF,
    isPublishable,
    generateLabel,
    resetData,
    setupFlix,
    createDraft,
    saveDraft,
  };
});
