'use strict';

module.exports = {
  themeData: flix => {
    return {
      primaryColor: flix.theme?.primary ?? '#ffffff',
      secondaryColor: flix.theme?.secondary ?? '#000000',
      tertiaryColor: flix.theme?.tertiary ?? '#f2f5ff',
      fontFamily: flix.theme?.font ?? 'Poppins',
    };
  },
  brandingData: flix => {
    if (!flix.branding) {
      return;
    }

    const branding = {
      name: flix.branding?.name,
    };
    if (flix?.branding?.intro) {
      branding.intro = flix.branding.intro;
      delete branding.intro.id;
    }
    if (flix?.branding?.banner) {
      branding.banner = {
        id: flix.branding.banner.id,
        name: flix.branding.banner.name,
        url: flix.branding.banner.url,
      };
    }
    if (flix?.branding?.logo) {
      branding.logo = {
        id: flix.branding.logo.id,
        name: flix.branding.logo.name,
        url: flix.branding.logo.url,
      };
    }
    return branding;
  },
  sidenoteData: async flix => {
    const flixId = flix.id;
    const notes = await strapi.entityService.findMany('api::side-note.side-note', {
      filters: { flix: flixId },
      fields: ['body'],
      limit: 1,
    });
    if (notes.length) {
      return notes[0].body;
    }
  },
  labelData: flix => {
    return {
      dateCreated: flix.labels?.dateCreated ?? 'Jaar',
      imageLicenseURI: flix.labels?.imageLicenseURI ?? 'Licentie',
      creators: flix.labels?.creators ?? 'Makers',
      contentLocationURIs: flix.labels?.contentLocationURIs ?? 'Plek',
      provinceURI: flix.labels?.provinceURI ?? 'Provincie',
      publisherURI: flix.labels?.publisherURI ?? 'Publisher',
    };
  },
  seoData: flix => {
    if (!flix.seo) {
      return;
    }
    delete flix.seo.id;
    if (flix.seo.ogImage) {
      flix.seo.ogImage = flix.seo.ogImage.url;
    }
    if (flix.seo.twitterImage) {
      flix.seo.twitterImage = flix.seo.twitterImage.url;
    }
    return flix.seo;
  },
};
