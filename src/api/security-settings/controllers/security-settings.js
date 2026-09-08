'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::security-settings.security-settings', {
  async find(ctx) {
    const entity = await strapi.db.query('api::security-settings.security-settings').findOne({});

    if (!entity) {
      return ctx.send({
        // img-src includes this Strapi instance's own origin (both host forms,
        // since dev defaults differ between the frontend's and backend's env
        // files) — catalog images (products/services/industries) are served
        // from its Media Library, not bundled into the frontend.
        contentSecurityPolicy: "default-src 'self'; img-src 'self' data: http://127.0.0.1:1337 http://localhost:1337; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'",
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
