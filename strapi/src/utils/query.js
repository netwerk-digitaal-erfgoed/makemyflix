const createQuery = (query = '', replacements = {}) => {
  const regex = new RegExp(Object.keys(replacements).join('|'), 'gi');
  return query.replace(regex, (matched) => replacements[matched]);
};

const generateFilters = (headers) => {
  const filters = {};

  if (headers['x-token']) {
    filters.hash = headers['x-token'];
  } else if (headers['x-flix']) {
    filters.uri = headers['x-flix'];
  }

  return filters;
}

const findFlix = async (filters) => {
  return strapi.entityService.findMany('api::flix.flix', {
    populate: {
      branding: {
        populate: {
          banner: true,
          logo: true,
          intro: true,
        },
      },
      theme: {
        populate: '*',
      },
      data: true,
      labels: true,
      seo: {
        populate: '*',
      },
    },
    filters,
    limit: 1,
  });
}

module.exports = {
  createQuery,
  generateFilters,
  findFlix
};
