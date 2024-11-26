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
  async create(ctx) {
    const { validateEndpoints } = strapi.service('api::flix.flix');

    // Fetch the data and if from the context
    const data = ctx.request.body.data;

    // Before create anything, atleast ensure the data is filled in.
    if (!data.data.endpointUrl || !data.data.itemsQuery || !data.data.categoryQuery) {
      return { code: 'INVALID_FIELDS' };
    }

    // Call Strapi's internal entity service to avoid invoking overridden methods
    const updatedEntity = await strapi.entityService.create('api::flix.flix', {
      data
    });

    // Sanitize the output to ensure it conforms to Strapi's response format
    const sanitizedEntity = await this.sanitizeOutput(updatedEntity, ctx);

    // Validate the endpoints
    return validateEndpoints(sanitizedEntity);
  },
  async update(ctx) {
    if (!ctx.request.header['x-token']) {
      return ctx.badRequest('No token provided');
    }
    const { generateUniqueUri, validateEndpoints } = strapi.service('api::flix.flix');

    // Update the uri incase there are more flixes with the same name
    ctx.request.body.data.uri = await generateUniqueUri(ctx.request.body.data);

    // Fetch the data and if from the context
    const { id } = ctx.params;
    const data = ctx.request.body.data;

    // Call Strapi's internal entity service to avoid invoking overridden methods
    const updatedEntity = await strapi.entityService.update('api::flix.flix', id, {
      data
    });

    // Sanitize the output to ensure it conforms to Strapi's response format
    const sanitizedEntity = await this.sanitizeOutput(updatedEntity, ctx);

    // Validate the endpoints
    return validateEndpoints(sanitizedEntity);
  }
}))
