'use strict';

/**
 * flix service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::flix.flix');
