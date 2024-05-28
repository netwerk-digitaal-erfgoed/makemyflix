module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/images/:identifier/:region/:size/:rotation/:quality.:format',
      handler: 'images.loadImage',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
