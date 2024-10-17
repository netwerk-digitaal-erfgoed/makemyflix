export const useFlixStore = defineStore('flix', () => {
  /**
   * State
   */
  const currentFlix = ref<Flix>();
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
      const setup = await $fetch<Flix>('/api/setup', { headers: { uri: flixUri } });

      // Add the flixUri for the guard
      // TODO: Double check this, seems off
      // setup.id = flix;
      // setup.uri = flixUri;

      // Update the current flix
      currentFlix.value = setup;

      // Set the theming
      useSetStyling(currentFlix.value.theme!);

      // Set SEO
      useSetSeo(currentFlix.value.seo);
    } catch (e) {
      console.error(e);
    }
  };

  /**
   * NEW CODE
   */
  const createDraft = async (): Promise<void> => {
    try {
      // Reset the currenFlix
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
    try {
      // No currentFlix to save, just return
      if (!currentFlix.value) {
        return;
      }

      // Save the flix
      const response = await useSaveFlix(currentFlix.value);

      // if no error occurred, update the currentFlix with the response
      // TODO: What to do when we do have an error
      if (!response?.error) {
        currentFlix.value.id = response.id;
        return response.attributes.hash;
      }
    } catch (error) {
      console.error('Error saving draft:', error);
    }
  };

  const publishDraft = async (): Promise<void> => {
    console.warn('not yet implemented');
    // await useSaveFlix(
    //   {
    //     data: {
    //       status: 'published',
    //       publishedAt: useStrapiDate(),
    //     },
    //   },
    //   newFlix.value.id,
    // );
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
  const determineInitialPreviewMediaQuery = (): PreviewMediaQuery => {
    const availableWidth = window.innerWidth - 380 - 48; // screen width, minus sidebar width, minus preview padding

    if (availableWidth <= 500) {
      return 'cellphone';
    }

    if (availableWidth <= 1180) {
      return 'tablet';
    }

    return 'laptop';
  };

  const previewView = ref<PreviewMediaQuery>(determineInitialPreviewMediaQuery());

  const newFlixSlug = computed(() => {
    if (!currentFlix.value?.title) {
      return undefined;
    }
    return useSlugify(currentFlix.value.title);
  });

  const previewMediaQueryClassName = computed(() => {
    return `preview-${previewView.value}`;
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
    previewView,
    previewMediaQueryClassName,
    newFlixSlug,
  };
});
