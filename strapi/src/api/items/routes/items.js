module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/category/:categoryId/items',
     handler: 'items.retrieveItemsByCategory',
     config: {
       policies: [],
       middlewares: ['global::context'],
     },
    },
  ],
};
