// @ts-nocheck
'use strict';
const axios = require('axios');
const { createQuery } = require('../../../utils/query');
const { slugify } = require('../../../utils/text');

const generateTitle = ({ name, provinceName, contentLocationNames }) => {
  if (name) {
    return name;
  }
  const locationName = contentLocationNames?.split('; ').pop();
  return `${locationName}, ${provinceName}`;
};

const generateSubtitle = ({ dateCreated, creatorNames }) => {
  const creatorName = creatorNames?.split('; ').pop();
  return [creatorName, dateCreated].filter(value => value).join(', ');
};

const generateName = input => {
  if (input.includes('URI')) {
    return input.replace(/URI/, 'Name');
  } else {
    const hasPluralName = input.slice(-1) === 's';
    const prepend = hasPluralName ? input.slice(0, -1) : input;
    const append = `Name${hasPluralName ? 's' : ''}`;
    return `${prepend}${append}`;
  }
};

const generateProperties = ({
  heritageObject,
  name,
  identifier,
  description,
  imageURI,
  publisherHomepage,
  ...metadata
}) => {
  const linkableProps = ['imageLicenseURI', 'provinceURI', 'publisherURI', 'creators', 'contentLocationURIs'];
  return Object.keys(metadata).reduce((collection, currentValue) => {
    const values = (metadata[currentValue] || '').split('; ');
    const isPublisherURI = currentValue === 'publisherURI';

    // Check if the property is linkable
    if (linkableProps.includes(currentValue)) {
      const name = generateName(currentValue);
      const names = metadata[name].split('; ');

      const result = values.map((value, index) => {
        return {
          label: names[index],
          value: isPublisherURI && !value ? publisherHomepage : value,
        };
      });
      collection[currentValue] = result.length > 1 ? result : result[0];
    } else {
      if (!currentValue.includes('Name')) {
        collection[currentValue] = {
          value: values[0],
        };
      }
    }
    return collection;
  }, {});
};

const addItemMeta = async (categoryId, uri) => {
  const record = await strapi.entityService.create('api::item-meta.item-meta', {
    data: {
      categoryId,
      uri,
    },
  });
  return record.id;
};

module.exports = () => ({
  getCategoryMeta: async categoryId => {
    return await strapi.entityService.findOne('api::category-meta.category-meta', categoryId);
  },
  getItemsByCategory: async (queryString, queryUrl, categoryUri, page, limit) => {
    try {
      const headers = {
        'Content-Type': 'application/sparql-query',
        'Accept': 'application/sparql-results+json',
      };
      const query = createQuery(queryString, {
        _LIMIT_: limit.toString(),
        _OFFSET_: (page * limit).toString(),
        _CATEGORYID_: categoryUri,
      });
      const response = await axios.post(queryUrl, query, { headers });
      return response.data ?? [];
    } catch (err) {
      return err;
    }
  },
  transformItems: async (categoryId, bindings) => {
    // Convert the bindings into compact objects with a slug
    const items = bindings.map(b => {
      const returnValue = {};
      for (const bKey in b) {
        returnValue[bKey] = b[bKey].value;
      }
      return returnValue;
    });

    // Find the meta data for the items
    const itemMetas = await strapi.entityService.findMany('api::item-meta.item-meta', {
      filters: { $or: items.map(item => ({ uri: item.heritageObject })), categoryId },
    });

    // Transform the items to the new format
    const transformedItems = [];
    for (const item of items) {
      const properties = generateProperties(item);
      const slug = slugify(item.name || '');
      const id =
        itemMetas.find(meta => meta.uri === item.heritageObject)?.id ||
        (await addItemMeta(categoryId, item.heritageObject));
      transformedItems.push({
        id,
        title: generateTitle(item),
        slug: `${slug}-${id}`,
        subTitle: generateSubtitle(item),
        description: item.description || '',
        image: item.imageURI,
        properties,
      });
    }
    return transformedItems;
  },
});
