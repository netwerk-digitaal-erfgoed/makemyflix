module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/categories',
      handler: 'categories.retrieveCategories',
      config: {
        policies: [],
        middlewares: ['global::context'],
      },
    },
  ],
};
