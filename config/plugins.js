require('dotenv').config();
module.exports = () => ({
  ckeditor5: {
    enabled: true,
  },

  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USERNAME,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      settings: {
        defaultFrom: process.env.EMAIL_FROM_ADDRESS,
        defaultReplyTo: process.env.EMAIL_FROM_ADDRESS,
      },
    },
  },

   'preview-button': {
    config: {
      contentTypes: [
        {
          uid: 'api::blog.blog',
          draft: {
            url: process.env.BASE_URL + '/preview/blog/{Slug}',
           
          },
          published: {
            url: process.env.BASE_URL + '/blog/{Slug}',
          },
        },
        {
          uid: 'api::product.product',
          draft: {
            url: process.env.BASE_URL + '/preview/product/{slug}',
           
          },
          published: {
            url: process.env.BASE_URL + '/shop/{slug}',
          },
        },
        {
          uid: 'api::product-category.product-category',
          draft: {
            url: process.env.BASE_URL + '/preview/collection/{slug}',
            
          },
          published: {
            url: process.env.BASE_URL + '/collection/{slug}',
          },
        },
        {
          uid: 'api::page.page',
          draft: {
            url: process.env.BASE_URL + '/preview/page/{slug}',
            
          },
          published: {
            url: process.env.BASE_URL + '/page/{slug}',
          },
        },
      ],
    },
  },
});
