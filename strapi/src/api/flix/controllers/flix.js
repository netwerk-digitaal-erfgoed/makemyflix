'use strict';

const { createCoreController } = require('@strapi/strapi').factories;
module.exports = createCoreController('api::flix.flix', ({ strapi }) => ({
  async update(ctx) {
    if (!ctx.request.header['x-token']) {
      ctx.badRequest('No token provided');
    }

    return super.update(ctx);
  }
}))
