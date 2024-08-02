import Endpoints from '~/components/Organisms/Create/Endpoints.vue';
import Identity from '~/components/Organisms/Create/Identity.vue';
import Styling from '~/components/Organisms/Create/Styling.vue';
import Preview from '~/components/Organisms/Create/Preview.vue';

const createDefaultNewFlixDataForDevelopment = () => {
  const devDefaultNewFlixData: FlixData = {
    endpoint:
      'https://api.data.netwerkdigitaalerfgoed.nl/datasets/heritageflix/churches-v1/services/churches-v1/sparql',
    categoryQuery:
      'PREFIX gn: <http://www.geonames.org/ontology#> PREFIX schema: <https://schema.org/> SELECT ?id ?name (COUNT(?heritageObject) AS ?numberOfHeritageObjects) WHERE { ?heritageObject a schema:CreativeWork ; schema:contentLocation ?contentLocation . ?contentLocation gn:parentADM1 ?id . ?id gn:name ?name . } ORDER BY ?name',
    itemsQuery:
      "PREFIX gn: <http://www.geonames.org/ontology#> PREFIX schema: <https://schema.org/> SELECT * WHERE { { SELECT ?heritageObject ?identifier ?description ?dateCreated ?imageURI ?imageLicenseURI ?imageLicenseName ?provinceURI ?provinceName ?publisherURI ?publisherName ?publisherHomepage (GROUP_CONCAT(?creator; SEPARATOR='; ') AS ?creators) (GROUP_CONCAT(?creatorName; SEPARATOR='; ') AS ?creatorNames) (GROUP_CONCAT(?contentLocationURI; SEPARATOR='; ') AS ?contentLocationURIs) (GROUP_CONCAT(?contentLocationName; SEPARATOR='; ') AS ?contentLocationNames) WHERE { BIND(<_CATEGORYID_> AS ?provinceURI) ?heritageObject a schema:CreativeWork ; schema:identifier ?identifier ; schema:description ?description ; schema:dateCreated ?dateCreated ; schema:creator ?creator ; schema:contentLocation ?contentLocationURI ; schema:publisher ?publisher ; schema:image ?image . ?image schema:contentUrl ?imageURI ; schema:license ?imageLicenseURI . ?imageLicenseURI schema:name ?imageLicenseName . ?creator schema:name ?creatorName . ?contentLocationURI gn:name ?contentLocationName ; gn:parentADM1 ?provinceURI . ?provinceURI gn:name ?provinceName . ?publisher schema:name ?publisherName ; schema:mainEntityOfPage ?publisherHomepage . OPTIONAL { ?heritageObject schema:mainEntityOfPage ?publisherURI } } ORDER BY ?contentLocationName } } LIMIT _LIMIT_ OFFSET _OFFSET_",
    primaryColor: '#000000',
    secondaryColor: '#00ff00',
    tertiaryColor: '#ff0000',
    title: 'Test',
    description: 'Test',
    fontFamily: 'Poppins',
  };

  return devDefaultNewFlixData;
};

export const useFlixBuilderStore = defineStore('flix-builder', () => {
  /**
   * Deps
   */
  const config = useRuntimeConfig();

  /**
   * State
   */
  const newFlix = ref<FlixData>(createDefaultNewFlixDataForDevelopment());
  const stepComponents: any[] = markRaw([Endpoints, Identity, Styling, Preview]);
  const stepsCount = stepComponents.length;
  const step = ref<number>(
    (() => {
      const intendedStep = +(useRoute().query.step?.toString() ?? '1');
      if (!Number.isSafeInteger(intendedStep) || intendedStep < 1 || intendedStep > stepComponents.length) {
        return 1;
      }
      return intendedStep;
    })(),
  );

  /**
   * Computed properties
   */
  const newFlixSlug = computed(() => {
    if (!newFlix.value.title) {
      return undefined;
    }
    return sluggify(newFlix.value.title);
  });

  /**
   * Methods
   */
  const next = () => {
    if (step.value < stepComponents.length) {
      step.value++;
    }
  };

  const back = () => {
    if (step.value > 1) {
      step.value--;
    }
  };

  const uploadImage = async (file: File | UploadedImage | null | undefined): Promise<UploadedImage | null> => {
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

    const [logoData, bannerData] = await Promise.all([uploadImage(logo), uploadImage(banner)]);

    const uri = `${window.location.origin}/${newFlixSlug.value}`;

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
      newFlix.value.id = response.id;
      newFlix.value.uri = uri;
      newFlix.value.logo = logoData;
      newFlix.value.banner = bannerData;
      return response;
    } catch (e) {
      // cleanup newly uploaded images to prevent reuploads of the same images upon errors
      if (logoData && logo !== logoData) {
        deleteImage(logoData);
      }

      if (bannerData && banner !== bannerData) {
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
    newFlix.value = {};
    step.value = 1;
  };

  return {
    newFlix,
    newFlixSlug,
    stepComponents,
    stepsCount,
    step,
    next,
    back,
    saveDraftFlix,
    publishFlix,
    resetStore,
  };
});
