'use strict';

/**
 * points controller
 */

module.exports = {
  async block(ctx) {
    const { mobile_number, transactional_points } = ctx.request.body || {};

    if (!mobile_number || typeof transactional_points !== 'number') {
      return ctx.badRequest('mobile_number and transactional_points are required.');
    }

    try {
      const data = await strapi.service('api::points.points').callProvider('block', {
        mobile_number,
        transactional_points,
      });
      ctx.body = { data };
    } catch (error) {
      strapi.log.error('Points block request failed', error);
      ctx.internalServerError('Failed to block points.');
    }
  },

  async unblock(ctx) {
    const { transaction_id, mobile_number } = ctx.request.body || {};

    if (!transaction_id) {
      return ctx.badRequest('transaction_id is required.');
    }

    try {
      const data = await strapi.service('api::points.points').callProvider('unblock', {
        transaction_id,
        mobile_number,
      });
      ctx.body = { data };
    } catch (error) {
      strapi.log.error('Points unblock request failed', error);
      ctx.internalServerError('Failed to unblock points.');
    }
  },
};
