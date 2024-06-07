module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/items',
     handler: 'items.retrieveItemsByCategory',
     config: {
       policies: [],
       middlewares: ['global::context'],
     },
    },
  ],
};
