'use strict';

/**
 * footer-column router
 *
 * find/findOne are public (footer nav data the storefront reads without auth);
 * create/update/delete stay admin-only.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::footer-column.footer-column', {
  config: {
    find: {
      auth: false,
    },
    findOne: {
      auth: false,
    },
  },
});
