'use strict';

module.exports = {
  retrieveSetup: async (ctx) => {
    try {
      // Fetch the flix info from the context
      const flix = ctx.state.flix;
      const setupService = strapi.service('api::setup.setup');
      const data = {
        title: flix.title,
      };

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
      const labelData = await setupService.labelData(flix);
      if (labelData) {
        data.labels = labelData;
      }

      ctx.body = data;
    } catch (err) {
      ctx.body = err;
    }
  },
};
