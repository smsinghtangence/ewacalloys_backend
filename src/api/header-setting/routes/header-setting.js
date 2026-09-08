'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/header-settings',
      handler: 'header-setting.find',
      config: {
        auth: false,
      },
    },
  ],
};
