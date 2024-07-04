export const useSetSeo = (seo?: Seo) => {
  if (seo) {
    useSeoMeta({ ...seo, title: seo.title || '' });
  } else {
    useSeoMeta({
      title: '',
      description: null,
      ogTitle: null,
      ogDescription: null,
      ogImage: null,
      twitterTitle: null,
      twitterDescription: null,
      twitterImage: null,
    });
  }
};
