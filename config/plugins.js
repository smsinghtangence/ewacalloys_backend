require('dotenv').config();
module.exports = () => ({
  ckeditor5: {
    enabled: true,
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
