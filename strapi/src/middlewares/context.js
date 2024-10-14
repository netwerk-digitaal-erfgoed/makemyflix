const { findFlix } = require("../utils/query");

module.exports = (config, { strapi }) => {
  return async (context, next) => {
    const flixUri = context.request.header['x-flix'];
    try {
      const [entry] = await findFlix({ uri: flixUri });

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
