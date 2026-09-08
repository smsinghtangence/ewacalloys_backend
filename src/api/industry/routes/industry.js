'use strict';

/**
 * industry router
 *
 * find/findOne are public (catalog data the storefront reads without auth);
 * create/update/delete stay admin-only.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::industry.industry', {
  config: {
    find: {
      auth: false,
    },
    findOne: {
      auth: false,
    },
  },
});
