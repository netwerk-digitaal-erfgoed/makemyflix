'use strict';

module.exports = {
  retrieveItemsByCategory: async ctx => {
    try {
      const {
        data: { endpointUrl, itemsQuery },
      } = ctx.state.flix;
      const { page, limit } = ctx.query;
      const { categoryId } = ctx.params;

      const { getItemsByCategory, transformItems, getCategoryMeta } = strapi.service('api::items.items');
      const categoryMeta = await getCategoryMeta(categoryId);
      if (!categoryMeta?.uri) {
        ctx.body = { error: 'Category not found' };
        return;
      }

      const items = await getItemsByCategory(
        itemsQuery,
        endpointUrl,
        categoryMeta.uri,
        parseInt(page) || 0,
        parseInt(limit) || 16,
      );
      ctx.body = await transformItems(categoryId, items);
    } catch (err) {
      ctx.body = err;
    }
  },
};
