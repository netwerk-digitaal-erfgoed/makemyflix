module.exports = (config, { strapi }) => {
  return async (context, next) => {
    const flixUri = context.request.header['x-flix'];
    try {
      const [entry] = await strapi.entityService.findMany('api::flix.flix', {
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
        filters: { uri: flixUri },
        limit: 1,
      });

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
