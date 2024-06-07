'use strict';

module.exports = {
  retrieveItemsByCategory: async (ctx) => {
    try {
      const {
        data: { endpointUrl, itemsQuery },
      } = ctx.state.flix;
      const { categoryId, categorySlug, page, limit } = ctx.query;

      const { getItemsByCategory, transformItems } =
        strapi.service('api::items.items');

      const items = await getItemsByCategory(
        itemsQuery,
        endpointUrl,
        categoryId,
        parseInt(page) || 0,
        parseInt(limit) || 16,
      );
      ctx.body = transformItems(categorySlug, items);
    } catch (err) {
      ctx.body = err;
    }
  },
};
