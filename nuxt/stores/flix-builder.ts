const createDefaultNewFlixData = () => {
  const devDefaultNewFlixData: FlixData = {
    endpoint: import.meta.dev
      ? 'https://api.data.netwerkdigitaalerfgoed.nl/datasets/heritageflix/churches-v1/services/churches-v1/sparql'
      : '',
    categoryQuery: import.meta.dev
      ? 'PREFIX gn: <http://www.geonames.org/ontology#> PREFIX schema: <https://schema.org/> SELECT ?id ?name (COUNT(?heritageObject) AS ?numberOfHeritageObjects) WHERE { ?heritageObject a schema:CreativeWork ; schema:contentLocation ?contentLocation . ?contentLocation gn:parentADM1 ?id . ?id gn:name ?name . } ORDER BY ?name'
      : '',
    itemsQuery: import.meta.dev
      ? "PREFIX gn: <http://www.geonames.org/ontology#> PREFIX schema: <https://schema.org/> SELECT * WHERE { { SELECT ?heritageObject ?identifier ?description ?dateCreated ?imageURI ?imageLicenseURI ?imageLicenseName ?provinceURI ?provinceName ?publisherURI ?publisherName ?publisherHomepage (GROUP_CONCAT(?creator; SEPARATOR='; ') AS ?creators) (GROUP_CONCAT(?creatorName; SEPARATOR='; ') AS ?creatorNames) (GROUP_CONCAT(?contentLocationURI; SEPARATOR='; ') AS ?contentLocationURIs) (GROUP_CONCAT(?contentLocationName; SEPARATOR='; ') AS ?contentLocationNames) WHERE { BIND(<_CATEGORYID_> AS ?provinceURI) ?heritageObject a schema:CreativeWork ; schema:identifier ?identifier ; schema:description ?description ; schema:dateCreated ?dateCreated ; schema:creator ?creator ; schema:contentLocation ?contentLocationURI ; schema:publisher ?publisher ; schema:image ?image . ?image schema:contentUrl ?imageURI ; schema:license ?imageLicenseURI . ?imageLicenseURI schema:name ?imageLicenseName . ?creator schema:name ?creatorName . ?contentLocationURI gn:name ?contentLocationName ; gn:parentADM1 ?provinceURI . ?provinceURI gn:name ?provinceName . ?publisher schema:name ?publisherName ; schema:mainEntityOfPage ?publisherHomepage . OPTIONAL { ?heritageObject schema:mainEntityOfPage ?publisherURI } } ORDER BY ?contentLocationName } } LIMIT _LIMIT_ OFFSET _OFFSET_"
      : '',
    primaryColor: '#000000',
    secondaryColor: '#FFFFFF',
    tertiaryColor: '#FFFFFF',
    title: 'Nieuwe Flix',
    description: '',
    fontFamily: 'Poppins',
  };

  return devDefaultNewFlixData;
};

const determineInitialPreviewMediaQuery = (): PreviewMediaQuery => {
  const availableWidth = window.innerWidth - 380 - 24; // screen width, minus sidebar width, minus preview padding

  if (availableWidth <= 390) {
    // iPhone 12 Pro width
    return 'cellphone';
  }

  if (availableWidth <= 1180) {
    // iPad Air width (landscape mode)
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
    return sluggify(newFlix.value.title);
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

  const sluggify = (text: string): string => {
    return text
      .toLowerCase() // Convert to lowercase
      .trim() // Trim whitespace from both ends
      .replace(/[\s\W-]+/g, '-') // Replace spaces and non-word characters with hyphens
      .replace(/^-+|-+$/g, ''); // Remove any leading or trailing hyphens
    // Thanks ChatGPT
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
