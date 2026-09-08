'use strict';

module.exports = {
  async afterCreate(event) {
    const { result } = event;

    try {
      await strapi.plugins['email'].services.email.send({
        to: process.env.EMAIL_ADMIN_ADDRESS,
        subject: `New contact form submission from ${result.name}`,
        text: [
          `Name: ${result.name}`,
          `Email: ${result.email}`,
          `Phone: ${result.phone || '-'}`,
          '',
          'Message:',
          result.message,
        ].join('\n'),
      });
    } catch (error) {
      strapi.log.error('Failed to send contact-submission notification email', error);
    }
  },
};
