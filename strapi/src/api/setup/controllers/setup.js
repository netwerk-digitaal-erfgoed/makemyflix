'use strict';

const { findFlix } = require("../../../utils/query");

const formatFlixData = async (flix, isDraft) => {
  const data = {};

  // Get the setup Service
  const setupService = strapi.service('api::setup.setup');

  // add theming data
  const themeData = setupService.themeData(flix);
  if (themeData) {
    data.theme = themeData;
  }

  // Add branding data
  const brandingData = setupService.brandingData(flix);
  if (brandingData) {
    data.branding = brandingData;
  }

  // Add sidenote data
  const sidenoteData = await setupService.sidenoteData(flix);
  if (sidenoteData) {
    data.sidenote = sidenoteData;
  }

  // Add Labels data
  const labelData = setupService.labelData(flix);
  if (labelData) {
    data.labels = labelData;
  }

  // Add Seo data
  const seoData = setupService.seoData(flix);
  if (seoData) {
    data.seo = flix.seo;
  }

  // Add query data, if it's a draft
  const queryData = setupService.queryData(flix);
  if (isDraft && queryData) {
    data.data = queryData;
  }

  return data;
};

module.exports = {
  retrieveSetup: async ctx => {
    try {
      const flix = ctx.state.flix;
      const data = await formatFlixData(flix);
      ctx.body = {
        id: flix.id,
        fallback: !!flix.fallbackIIIF,
        ...data
      };
      ctx.body = data;
    } catch (err) {
      ctx.body = err;
    }
  },
  createDraft: async ctx => {
    try {
      let flix;

      // Check if there is a token, if so find the flix
      const flixToken = ctx.request.header['x-token'];
      if (flixToken) {
        const [entry] = await findFlix({ hash: flixToken });
        if (entry) {
          const data = await formatFlixData(entry, true);
          flix = {
            id: entry.id,
            publishedAt: entry.publishedAt,
            fallback: !!entry.fallbackIIIF,
            ...data
          };
        }
      }

      // If flix is still empty, create an empty one
      if (!flix) {
        // TODO: Add fallback?
        flix = await formatFlixData({}, true);
        flix.publishedAt = null;
      }

      ctx.body = flix;
    } catch (err) {
      ctx.body = err;
    }
  }
};
