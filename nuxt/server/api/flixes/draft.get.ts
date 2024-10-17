import { generateHeaders } from '~/server/utils/generateHeaders';

const generateDraft = (): Flix => {
  return {
    uri: undefined,
    fallbackIIIF: true,
    branding: {
      name: '',
      intro: {
        title: '',
        description: '',
        footer: '',
      },
      logo: undefined,
      banner: undefined,
    },
    data: {
      endpointUrl: '',
      categoryQuery: '',
      itemsQuery: '',
    },
    theme: {
      font: 'Poppins',
      primary: '#ffffff',
      secondary: '#000000',
      tertiary: '#f2f5ff',
    },
    labels: {
      dateCreated: 'Jaar',
      imageLicenseURI: 'Licentie',
      creators: 'Makers',
      contentLocationURIs: 'Plek',
      provinceURI: 'Provincie',
      publisherURI: 'Publisher',
    },
  };
};

export default defineEventHandler<Promise<Flix | null>>(async event => {
  const {
    public: { backendUrl },
  } = useRuntimeConfig();
  const headers = generateHeaders(event);

  if (headers['x-token']) {
    return $fetch<Flix>(`${backendUrl}/setup`, {
      headers,
    });
  }
  return Promise.resolve(generateDraft());
});
