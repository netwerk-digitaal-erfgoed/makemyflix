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
      const headers = {
        'Content-Type': 'application/sparql-query',
        'Accept': 'application/sparql-results+json',
      };
      const query = createQuery(queryString, {
        _LIMIT_: limit.toString(),
      });
      const response = await axios.post(queryUrl, query, { headers });
      return response.data ?? [];
    } catch (err) {
      return err;
    }
  },
  transformCategories: async bindings => {
    // Convert the bindings into compact objects with a slug
    const categories = bindings.map(b => {
      const returnValue = {};
      for (const bKey in b) {
        returnValue[bKey] = b[bKey].value;
      }
      returnValue.slug = slugify(returnValue.name);
      return returnValue;
    });

    // Find the meta data for the categories
    const categoryMetas = await strapi.entityService.findMany('api::category-meta.category-meta', {
      filters: { $or: categories.map(c => ({ uri: c.id, slug: c.slug })) },
    });

    // Transform the categories to the new format
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
