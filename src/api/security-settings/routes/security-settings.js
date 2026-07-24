'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/security-settings',
      handler: 'security-settings.find',
      config: {
        auth: false,
      },
    },
  ],
};
