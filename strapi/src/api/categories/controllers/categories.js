'use strict';

module.exports = {
  retrieveCategories: async (ctx) => {
    try {
      const { data: { endpointUrl, categoryQuery } } = ctx.state.flix;
      const { getCategories, transformCategories } = strapi.service('api::categories.categories');

      const categories = await getCategories(categoryQuery, endpointUrl);
      ctx.body = transformCategories(categories);
    } catch (err) {
      ctx.body = err;
    }
  },
};
