'use strict';

const CATEGORY_MIN_PROPS = ['numberOfHeritageObjects', 'id', 'name'];
const ITEM_MIN_PROPS = ['heritageObject', 'name', 'description'];

const validateStructure = (keys, requiredProps) => {
  return requiredProps.every(prop => keys.includes(prop));
};

const generateResponse = (hash, code) => {
  return {
    hash,
    code
  };
};

module.exports = () => ({
  generateUniqueUri: async ({ branding: { name }, uri, id }) => {
    if (!name || !uri || !id) {
      return '';
    }

    // Count the number of flixes with the same branding name
    const count = await strapi.entityService.count('api::flix.flix', {
      filters: {
        branding: {
          name
        },
        id: {
          $ne: id
        }
      }
    });
    return count ? `${uri}-${count}` : uri;
  },
  validateEndpoints: async (sanitizedEntry) => {
    // Fetch the data based on the id in the sanitized entry
    const originalEntry = await strapi.entityService.findOne('api::flix.flix', sanitizedEntry.id, {
      populate: ['data']
    });
    if (!originalEntry.data) {
      throw new Error('No data found');
    }

    const { endpointUrl, itemsQuery, categoryQuery } = originalEntry.data;
    if (!endpointUrl || !itemsQuery || !categoryQuery) {
      return generateResponse(sanitizedEntry.hash, 'INVALID_FIELDS');
    }

    // Validate the category query
    const { getCategories } = strapi.service('api::categories.categories');
    const { head, results, response } = await getCategories(categoryQuery, endpointUrl, 1);

    // If the response status is not 200, return the status and message
    if (response?.status && response.status !== 200) {
      return generateResponse(sanitizedEntry.hash, 'INVALID_CATEGORY_QUERY');
    }

    // Validate the category structure
    const isValidCategory = validateStructure(head.vars, CATEGORY_MIN_PROPS);
    if (!isValidCategory) {
      return generateResponse(sanitizedEntry.hash, 'INVALID_CATEGORY_STRUCTURE');
    }

    // Valid category, so take the first id and test the items query
    const id = results.bindings?.[0].id.value;
    if (!id) {
      return generateResponse(sanitizedEntry.hash, 'INVALID_CATEGORY_ID');
    }

    // Validate the items query
    const { getItemsByCategory } = strapi.service('api::items.items');
    const { head: itemsHead, response: itemsResponse } = await getItemsByCategory(itemsQuery, endpointUrl, id, 1, 0);

    // If the response status is not 200, return the status and message
    if (itemsResponse?.status && itemsResponse.status !== 200) {
      return generateResponse(sanitizedEntry.hash, 'INVALID_ITEMS_QUERY');
    }

    // Validate the items structure
    const isValidItems = validateStructure(itemsHead.vars, ITEM_MIN_PROPS);
    console.warn(isValidItems, itemsHead.vars, ITEM_MIN_PROPS);
    if (!isValidItems) {
      return generateResponse(sanitizedEntry.hash, 'INVALID_ITEMS_STRUCTURE');
    }

    // Everything is fine, just return the sanitized entry
    return sanitizedEntry;
  }
});
