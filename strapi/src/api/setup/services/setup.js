// @ts-nocheck
'use strict';

/**
 * setup service
 */

module.exports = {
  getFlix: async (path) => {
    try {
      const entry = (
        await strapi.entityService.findMany('api::flix.flix', {
          fields: ['id', 'title', 'backgroundColor', 'fonts'],
          populate: {
            branding: {
              fields: ['id', 'name'],
              populate: {
                banner: {
                  fields: ['url'],
                },
                logo: {
                  fields: ['url'],
                },
                intro: {
                  fields: ['id', 'title', 'description', 'footer'],
                },
              },
            },
          },
          filters: { path },
          limit: 1,
        })
      )?.[0];
      // Make sure to return the URL of the banner and logo
      if (entry?.branding?.banner) {
        entry.branding.banner = entry.branding.banner.url;
      }
      if (entry?.branding?.logo) {
        entry.branding.logo = entry.branding.logo.url;
      }
      return entry;
    } catch (err) {
      return err;
    }
  },
};
