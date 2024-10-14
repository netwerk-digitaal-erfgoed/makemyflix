'use strict';

const { createCoreController } = require('@strapi/strapi').factories;
module.exports = createCoreController('api::flix.flix', ({ strapi }) => ({
  // Overwriting the create action
  async update(params) {
    console.warn(params);


    // Now, call the default core service's create method
    const result = await super.update(params);

    // Optionally, perform some post-creation logic
    // For instance, logging the created article's title
    // console.log(`Article created with title: ${result.title}`);

    return result;
  }
}))
