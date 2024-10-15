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

export const useFlixBuilderStore = defineStore('flix-builder', () => {
  /**
   * State
   */
  const config = useRuntimeConfig();
  const newFlix = ref<FlixData>({});
  const previewView = ref<PreviewMediaQuery>(determineInitialPreviewMediaQuery());

  /**
   * Computed properties
   */
  const newFlixSlug = computed(() => {
    if (!newFlix.value.title) {
      return undefined;
    }
    return useSlugify(newFlix.value.title);
  });

  const previewMediaQueryClassName = computed(() => {
    return `preview-${previewView.value}`;
  });

  /**
   * Private Methods (only used in store)
   */
  const uploadImage = async (file: File | UploadedImage | null | undefined): Promise<UploadedImage | null> => {
    if (!(file instanceof File)) {
      return file ?? null;
    }

    const formData = new FormData();
    formData.append('files', file);

    return $fetch<UploadedImage>(`/api/images`, {
      method: 'POST',
      body: formData,
    });
  };

  const deleteImage = async (image: UploadedImage) => {
    await $fetch(`api/images/${image.id}`, {
      method: 'DELETE',
    });
  };

  const saveFlix = async (body: Record<string, any>, id?: string) => {
    let url = `/api/flixes`;
    let method: 'POST' | 'PUT' = 'POST';

    if (id) {
      url += `/${id}`;
      method = 'PUT';
    }

    try {
      const { data }: any = await $fetch(url, {
        method,
        body,
      });

      return data;
    } catch (error) {
      console.error('Error saving flix:', error);
      return undefined;
    }
  };

  /**
   * Public Methods
   */
  const saveDraftFlix = async () => {
    const {
      endpoint,
      categoryQuery,
      itemsQuery,
      title,
      description,
      logo,
      banner,
      primaryColor,
      secondaryColor,
      tertiaryColor,
      fontFamily,
    } = newFlix.value;

    if (!newFlixSlug.value) {
      return null;
    }

    const uri = `${window.location.origin}/${newFlixSlug.value}`;

    const [logoData, bannerData] = await Promise.all([uploadImage(logo), uploadImage(banner)]);

    const data = {
      data: {
        publishedAt: null,
        data: {
          endpointUrl: endpoint,
          categoryQuery,
          itemsQuery,
        },
        fallbackIIIF: true,
        uri,
        branding: {
          name: title,
          logo: {
            set: logoData ? [logoData.id] : [],
          },
          banner: {
            set: bannerData ? [bannerData.id] : [],
          },
          intro: {
            title,
            description,
          },
        },
        theme: {
          font: fontFamily,
          primary: primaryColor,
          secondary: secondaryColor,
          tertiary: tertiaryColor,
        },
      },
    };

    try {
      const response = await saveFlix(data, newFlix.value.id);

      if (response) {
        newFlix.value.id = response.id;
      }

      newFlix.value.uri = uri;
      newFlix.value.logo = logoData;
      newFlix.value.banner = bannerData;
      return response;
    } catch (e) {
      // cleanup newly uploaded images to prevent reuploads of the same images upon errors
      if (logoData && logo !== logoData && typeof logoData !== 'string') {
        deleteImage(logoData);
      }

      if (bannerData && banner !== bannerData && typeof bannerData !== 'string') {
        deleteImage(bannerData);
      }

      console.error(e);
      return null;
    }
  };

  const publishFlix = async () => {
    await saveFlix(
      {
        data: {
          status: 'published',
          publishedAt: useStrapiDate(),
        },
      },
      newFlix.value.id,
    );
  };

  const fetchContent = async (token?: string) => {
    try {
      const headers: Record<string, string> = {
        Authorization: `Bearer ${config.app.token}`,
      };
      if (token) {
        headers['X-Token'] = token;
      }

      // Create a new context
      const context = await $fetch(`${config.app.backendUrl}/create-context`, { headers });
      newFlix.value = context as FlixData;
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const resetStore = () => {
    newFlix.value = {} as FlixData;
  };

  return {};
});
