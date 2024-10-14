module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/setup',
      handler: 'setup.retrieveSetup',
      config: {
        policies: [],
        middlewares: ['global::context'],
      },
    },
    {
      method: 'GET',
      path: '/draft',
      handler: 'setup.createDraft',
      config: {
        policies: [],
        middlewares: [],
      },
    },

  ],
};
