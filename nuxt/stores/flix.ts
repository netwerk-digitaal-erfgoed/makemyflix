export const useFlixStore = defineStore('flix', () => {
  /**
   * State
   */
  const currentFlix = ref<Flix>();
  const currentToken = ref<string>();
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
    currentFlix.value = undefined;
    useArtworkStore().resetData();
    useCategoryStore().resetData();
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

  const saveDraft = async (): Promise<string | void> => {
    // No currentFlix to save, just return
    if (!currentFlix.value) {
      return;
    }

    // Save the flix
    const response = await useSaveFlix(currentFlix.value);
    if (response?.flix) {
      currentFlix.value = response.flix;
      return response.hash;
    }
    return;
  };

  const publishDraft = async (): Promise<void> => {
    if (!currentFlix.value) {
      return;
    }

    // Update publish state
    currentFlix.value.publishedAt = useStrapiDate();
    currentFlix.value.status = 'published';

    const response = await useSaveFlix(currentFlix.value);
    if (response?.flix) {
      isPreview.value = false;
      currentFlix.value = response.flix;
      return response.hash;
    }
  };

  // Preview related states
  const currentViewport = ref<PreviewMediaQuery>('laptop');

  const supportedViewports = computed<PreviewMediaQuery[]>(() => {
    return ['laptop', 'tablet', 'cellphone'];
  });

  const supportedFonts = computed<string[]>(() => {
    return ['Poppins', 'Times New Roman'];
  });

  /**
   * Code from the flix-builder store, which should be solved differently
   * TODO: Work towards removing this
   */
  const newFlixSlug = computed(() => {
    if (!currentFlix.value?.title) {
      return undefined;
    }
    return useSlugify(currentFlix.value.title);
  });

  const previewMediaQueryClassName = computed(() => {
    return `preview-${currentViewport.value}`;
  });

  return {
    currentFlix,
    branding,
    sidenote,
    supportIIIF,
    setupFlix,
    generateLabel,
    resetData,

    // new code
    isPreview,

    currentViewport,
    supportedViewports,
    supportedFonts,

    createDraft,
    saveDraft,
    publishDraft,

    // These should be removed
    previewMediaQueryClassName,
    newFlixSlug,

    isPublishable,
  };
});
