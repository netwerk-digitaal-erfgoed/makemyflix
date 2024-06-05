'use strict';

/**
 * A set of functions called "actions" for `setup`
 */

module.exports = {
  retrieveSetup: async (ctx) => {
    try {
      const data = await strapi
        .service('api::setup.setup')
        .getFlix(ctx.query.path);
      ctx.body = data;
    } catch (err) {
      ctx.body = err;
    }
  },
};
