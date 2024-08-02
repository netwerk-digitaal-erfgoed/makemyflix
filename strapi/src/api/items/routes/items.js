module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/categories/:categoryId/items',
     handler: 'items.retrieveItemsByCategory',
     config: {
       policies: [],
       middlewares: ['global::context'],
     },
    },
  ],
};
