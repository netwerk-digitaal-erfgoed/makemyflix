// @ts-nocheck
'use strict';
const axios = require('axios');
const { createQuery } = require('../../../utils/query');
const { capitalize, periodName, slugify } = require('../../../utils/text');

const addCategoryMeta = async (uri, slug) => {
  const record = await strapi.entityService.create('api::category-meta.category-meta', {
    data: {
      uri,
      slug,
    },
  });
  return record.id;
};

module.exports = () => ({
  getCategories: async (queryString, queryUrl, limit = 1000) => {
    try {
      const query = createQuery(queryString, {
        _LIMIT_: limit.toString(),
      });

      return (await axios.post(queryUrl, { query })).data || [];
    } catch (err) {
      return err;
    }
  },
  transformCategories: async categories => {
    categories = categories.map(c => ({ ...c, slug: slugify(c.name) }));
    const categoryMetas = await strapi.entityService.findMany('api::category-meta.category-meta', {
      filters: { $or: categories.map(c => ({ uri: c.id, slug: c.slug })) },
    });

    const transformedCategories = [];
    for (const category of categories) {
      const id =
        categoryMetas.find(meta => meta.uri === category.id && meta.slug === category.slug)?.id ||
        (await addCategoryMeta(category.id, category.slug));
      // TODO: Improve this transformation. f.e. don't force optional properties like period
      transformedCategories.push({
        id,
        slug: category.slug,
        title: capitalize(category.name),
        description: category.description || '',
        period: periodName(category?.startDate, category?.endDate),
        numberOfArtworks: parseInt(category.numberOfHeritageObjects, 10),
      });
    }
    return transformedCategories;
  },
});
