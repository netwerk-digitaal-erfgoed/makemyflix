'use strict';
const axios = require('axios');
const { createQuery } = require('../../../utils/query');
const { capitalize, periodName, slugify } = require('../../../utils/text');

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
  transformCategories: (categories) => {
    return categories.map((category) => {
      return {
        id: slugify(category.name),
        originalId: category.id,
        title: capitalize(category.name),
        description: category.description,
        period: periodName(category?.startDate, category?.endDate),
        numberOfArtworks: parseInt(category.numberOfHeritageObjects, 10),
      };
    });
  },
});
