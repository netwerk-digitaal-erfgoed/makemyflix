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
  ],
};
