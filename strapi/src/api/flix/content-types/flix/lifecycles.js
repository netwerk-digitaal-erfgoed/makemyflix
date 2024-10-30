'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async beforeCreate(event) {
    const { params } = event;
    params.data.hash = uuidv4();
  },
  async beforeUpdate(event) {
    const { params } = event;
    const originalEntry = await strapi.entityService.findOne('api::flix.flix', params.where.id, {
      fields: ['hash'],
    });
    params.data.hash = originalEntry.hash ?? uuidv4();
  },
};
