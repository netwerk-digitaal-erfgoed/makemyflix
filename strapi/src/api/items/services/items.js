'use strict';
const axios = require('axios');
const { createQuery } = require('../../../utils/query');
const { slugify } = require('../../../utils/text');

const generateTitle = ({name, provinceName, contentLocationNames}) => {
  if (name) {
    return name;
  }
  const locationName = contentLocationNames?.split('; ').pop();
  return `${locationName}, ${provinceName}`
}

const generateSubtitle = ({dateCreated, creatorNames}) => {
  const creatorName = creatorNames?.split('; ').pop();
  return [creatorName, dateCreated]
    .filter(value => value)
    .join(', ');
}

const generateName = (input) => {
  if (input.includes('URI')) {
    return input.replace(/URI/, 'Name');
  } else {
    const hasPluralName = input.slice(-1) === 's';
    const prepend = hasPluralName ? input.slice(0, -1) : input;
    const append = `Name${hasPluralName ? 's' : ''}`;
    return `${prepend}${append}`;
  }
}

const generateProperties = ({ heritageObject, name, identifier, description, imageURI, publisherHomepage, ...metadata  }) => {
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
          value: (isPublisherURI && !value) ? publisherHomepage : value
        }
      });
      collection[currentValue] = result.length > 1 ? result : result[0];
    } else {
      if (!currentValue.includes('Name')) {
        collection[currentValue] = {
          value: values[0]
        }
      }
    }
    return collection
  }, {});
}

module.exports = () => ({
  getItemsByCategory: async (
    queryString,
    queryUrl,
    categoryId,
    page,
    limit
  ) => {
    try {
      const query = createQuery(queryString, {
        _LIMIT_: limit.toString(),
        _OFFSET_: (page * limit).toString(),
        _CATEGORYID_: categoryId,
      });

      return (await axios.post(queryUrl, { query })).data || [];
    } catch (err) {
      return err;
    }
  },
  transformItems: (categoryId, items) => {
    return items.map((item) => {
      const id = item.identifier || slugify(item.name || '');
      const properties = generateProperties(item);
      return {
        id,
        title: generateTitle(item),
        subTitle: generateSubtitle(item),
        description: item.description,
        originalId: item.heritageObject,
        image: item.imageURI,
        categoryId,
        properties
      };
    });
  },
});
