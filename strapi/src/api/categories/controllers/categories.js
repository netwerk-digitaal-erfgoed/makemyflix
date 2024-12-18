'use strict';

module.exports = {
  retrieveCategories: async ctx => {
    try {
      const { data = {} } = ctx.state.flix;
      const { endpointUrl, categoryQuery } = data;
      const { getCategories, transformCategories } = strapi.service('api::categories.categories');
      const { results } = await getCategories(categoryQuery, endpointUrl);
      ctx.body = await transformCategories(results.bindings);
    } catch (err) {
      ctx.body = err;
    }
  },
};
