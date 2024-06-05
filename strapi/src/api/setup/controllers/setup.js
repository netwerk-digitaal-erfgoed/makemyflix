'use strict';

module.exports = {
  retrieveSetup: async (ctx) => {
    try {
      // Fetch the flix info from the context
      const flix = ctx.state.flix;
      const setupService = strapi.service('api::setup.setup');

      // @TODO: Colors/fonts should be moved to the setupService once there are more
      const data = {
        title: flix.title,
        backgroundColor: flix.backgroundColor
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
      ctx.body = data;
    } catch (err) {
      ctx.body = err;
    }
  },
};
