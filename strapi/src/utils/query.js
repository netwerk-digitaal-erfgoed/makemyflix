const createQuery = (query = '', replacements = {}) => {
  const regex = new RegExp(Object.keys(replacements).join('|'), 'gi');
  return query.replace(regex, (matched) => replacements[matched]);
};

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
        populate: {
          primary: true,
          secondary: true,
          tertiary: true,
          font: true,
        },
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
  findFlix
};
