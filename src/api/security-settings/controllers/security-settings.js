'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::security-settings.security-settings', {
  async find(ctx) {
    const entity = await strapi.db.query('api::security-settings.security-settings').findOne({});

    if (!entity) {
      return ctx.send({
        contentSecurityPolicy: "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'",
        permissionsPolicy: "camera=(), microphone=(), geolocation=()",
        referrerPolicy: "strict-origin-when-cross-origin",
        xFrameOptions: "DENY",
        xContentTypeOptions: "nosniff",
        strictTransportSecurity: "max-age=31536000; includeSubDomains"
      });
    }

    return ctx.send(entity);
  },
});
