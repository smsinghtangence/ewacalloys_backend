'use strict';

/**
 * points router
 *
 * Intentionally NOT auth: false — unlike the public contact form, this deals
 * with a customer's redeemable points/discount value, so callers must
 * authenticate with a Strapi API token (Settings > API Tokens in the admin).
 */

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/points/block',
      handler: 'points.block',
    },
    {
      method: 'POST',
      path: '/points/unblock',
      handler: 'points.unblock',
    },
  ],
};
