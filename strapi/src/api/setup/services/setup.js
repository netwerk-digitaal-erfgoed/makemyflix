'use strict';

module.exports = {
  themeData: (flix) => {
    if (!flix.theme) {
      return;
    }

    return {
      primaryColor: flix.theme.primary ?? '#000000',
      secondaryColor: flix.theme.secondary ?? '#ffffff',
      tertiaryColor: flix.theme.tertiary ?? '#f2f5ff',
      fontFamily: flix.theme.font ?? 'Poppins',
    };
  },
  brandingData: (flix) => {
    if (!flix.branding) {
      return;
    }

    const branding = {
      name: flix.branding?.name
    };
    if (flix?.branding?.intro) {
      branding.intro = flix.branding.intro;
      delete branding.intro.id;
    }
    if (flix?.branding?.banner) {
      branding.banner = flix.branding.banner.url;
    }
    if (flix?.branding?.logo) {
      branding.logo = flix.branding.logo.url;
    }
    return branding;
  },
  sidenoteData: async (flix) => {
    const flixId = flix.id;
    const notes = await strapi.entityService.findMany('api::side-note.side-note', {
      filters: { flix: flixId },
      fields: ['body'],
      limit: 1
    });
    if (notes.length) {
      return notes[0].body;
    }
  }
};
