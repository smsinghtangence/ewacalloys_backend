'use strict';

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::security-settings.security-settings');
