const { findFlix } = require("../utils/query");

const generateFilter = (headers) => {
  const filters = {};

  if (headers['x-token']) {
    filters.hash = headers['x-token'];
  } else if (headers['x-flix']) {
    filters.uri = headers['x-flix'];
  }

  return filters;
}

module.exports = (config, { strapi }) => {
  return async (context, next) => {
    try {
      const filters = generateFilter(context.request.header);
      const [entry] = await findFlix(filters);

      if (!entry) {
        context.status = 404;
        context.body = 'No flix found';
        return;
      }

      context.state.flix = entry;
      await next();
    } catch (error) {
      console.error(error);
      context.status = 500;
      context.body = 'Error fetching setup data';
    }
  };
};
