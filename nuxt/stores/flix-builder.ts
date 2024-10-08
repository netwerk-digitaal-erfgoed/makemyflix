const createDefaultNewFlixData = () => {
  const devDefaultNewFlixData: FlixData = {
    endpoint: '',
    categoryQuery: '',
    itemsQuery: '',
    primaryColor: '#FFFFFF',
    secondaryColor: '#000000',
    tertiaryColor: '#FFFFFF',
    title: 'Nieuwe Flix',
    description: '',
    fontFamily: 'Poppins',
  };

  return devDefaultNewFlixData;
};

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
   * Deps
   */
  const config = useRuntimeConfig();
  const flixStore = useFlixStore();

  /**
   * State
   */
  const newFlix = ref<FlixData>(createDefaultNewFlixData());
  const previewView = ref<PreviewMediaQuery>(determineInitialPreviewMediaQuery());
  const step = ref<number>(1);

  /**
   * Computed properties
   */
  const newFlixSlug = computed(() => {
    if (!newFlix.value.title) {
      return undefined;
    }
    return useSlugify(newFlix.value.title);
  });

  const previewMediaQueryClassName = computed(() => `preview-${previewView.value}`);

  const newFlixTheme = computed<Theme>(() => {
    return {
      fontFamily: newFlix.value.fontFamily ?? 'Poppins',
      primaryColor: newFlix.value.primaryColor ?? '',
      secondaryColor: newFlix.value.secondaryColor ?? '',
      tertiaryColor: newFlix.value.tertiaryColor ?? '',
    };
  });

  /**
   * Methods
   */
  const uploadImage = async (
    file: File | UploadedImage | null | undefined,
  ): Promise<UploadedImage | null> => {
    if (!(file instanceof File)) {
      return file ?? null;
    }

    const formData = new FormData();
    formData.append('files', file);

    const response = await $fetch<UploadedImage[]>(`${config.app.backendUrl}/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.app.token}`,
      },
      body: formData,
    });

    return response?.[0] ?? null;
  };

  const deleteImage = async (image: UploadedImage) => {
    await $fetch<UploadedImage[]>(`${config.app.backendUrl}/upload/files/${image.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${config.app.token}`,
      },
    });
  };

  const saveFlix = async (body: Record<string, any>, id?: string) => {
    let url = `${config.app.backendUrl}/flixes`;
    let method: 'POST' | 'PUT' = 'POST';

    if (id) {
      url += `/${id}`;
      method = 'PUT';
    }

    try {
      const { data }: any = await $fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${config.app.token}`,
        },
        body: JSON.stringify(body),
      });

      return data;
    } catch (error) {
      console.error('Error saving flix:', error);
      return undefined;
    }
  };

  const mergeExistingFlix = async (uri: string) => {
    try {
      const current = await flixStore.fetchFlix(uri);

      if (current) {
        newFlix.value = {
          banner: current.branding?.banner,
          categoryQuery: newFlix.value.categoryQuery,
          description: current.branding?.intro.description,
          endpoint: newFlix.value.endpoint,
          fontFamily: current.theme?.fontFamily ?? 'Poppins',
          id: current.id,
          itemsQuery: newFlix.value.itemsQuery,
          logo: current.branding?.logo,
          primaryColor: current.theme?.primaryColor,
          secondaryColor: current.theme?.secondaryColor,
          slug: newFlixSlug.value,
          tertiaryColor: current.theme?.tertiaryColor,
          title: current.branding?.intro.title,
          uri: uri,
        };

        return true;
      }
    } catch (e) {
      console.error(e);
    }

    return false;
  };

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

  const pad = (n: number) => String(n).padStart(2, '0');

  const publishFlix = async () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
    const publishedAt = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    await saveFlix(
      {
        data: {
          status: 'published',
          publishedAt,
        },
      },
      newFlix.value.id,
    );
  };

  const resetStore = () => {
    newFlix.value = createDefaultNewFlixData();
    step.value = 1;
  };

  return {
    newFlix,
    newFlixTheme,
    previewView,
    previewMediaQueryClassName,
    newFlixSlug,
    step,
    mergeExistingFlix,
    saveDraftFlix,
    publishFlix,
    resetStore,
  };
});
