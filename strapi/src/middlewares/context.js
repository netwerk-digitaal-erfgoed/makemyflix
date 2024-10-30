const { findFlix, generateFilters } = require("../utils/query");

module.exports = (config, { strapi }) => {
  return async (context, next) => {
    try {
      const filters = generateFilters(context.request.header);
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
