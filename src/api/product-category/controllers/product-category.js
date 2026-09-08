'use strict';

/**
 * product-category controller
 *
 * `find` is overridden (rather than using the default createCoreController
 * REST response) because Strapi's public/anonymous content-API sanitization
 * strips relations to OTHER content-types from populated output unless the
 * request carries a fully-permissioned ability context (media/Image
 * relations are exempt, which is why those still populate fine on the
 * default action) — going straight through the Document Service API here
 * avoids that entirely and reliably returns the nested `products` list the
 * storefront needs.
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::product-category.product-category', () => ({
  async find(ctx) {
    const data = await strapi.documents('api::product-category.product-category').findMany({
      populate: {
        Image: true,
        products: {
          populate: { Image: true },
          sort: 'order:asc',
        },
      },
      sort: 'order:asc',
      status: 'published',
    });

    ctx.body = { data };
  },
}));
