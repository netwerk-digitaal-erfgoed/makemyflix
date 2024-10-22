'use strict';

const { findFlix, generateFilters } = require('../../../utils/query');
const { createCoreController } = require('@strapi/strapi').factories;
module.exports = createCoreController('api::flix.flix', ({ strapi }) => ({
  async find(ctx) {
    // Generate the filters
    const filters = generateFilters(ctx.request.header);

    // No filters means we return it all
    if (Object.keys(filters).length === 0) {
      return super.find(ctx);
    }

    // Find the flix based on the filters
    const [entry] = await findFlix(filters);
    return entry;
  },
  async update(ctx) {
    if (!ctx.request.header['x-token']) {
      return ctx.badRequest('No token provided');
    }

    // Make sure the uri is unique by checking the count of flixes with same name
    let { branding: { name }, uri, id } = ctx.request.body.data;

    const count = await strapi.entityService.count('api::flix.flix', {
      filters: {
        branding: {
          name
        },
        id: {
          $ne: id
        }
      }
    });

    if (count) {
      ctx.request.body.data.uri = `${uri}-${count}`;
    }

    return super.update(ctx);
  }
}))
