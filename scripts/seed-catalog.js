'use strict';

/**
 * One-time, idempotent seed for the product-category/product/service/industry
 * catalog. Uploads the site's existing design images into Strapi's Media
 * Library and creates + publishes matching entries.
 *
 * Run once from `backend/`: node scripts/seed-catalog.js
 * Safe to re-run — skips seeding if product categories already exist.
 */

const fs = require('fs');
const path = require('path');
const { createStrapi, compileStrapi } = require('@strapi/strapi');

const IMAGES_DIR = path.resolve(__dirname, '../../frontend/public/assets/images');

// Strapi's `uid` field only auto-generates from the admin panel's UI, not via
// programmatic Document Service creates — so slugs are computed explicitly here.
function slugify(name) {
  return name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const MIME_TYPES = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.gif': 'image/gif',
};

const PRODUCT_CATEGORIES = [
  {
    name: 'Maintenance & Repair',
    image: 'products1.png',
    products: [
      { name: 'Manual Metal Arc Welding', image: 'solution1.png' },
      { name: 'Flux Cored Wires & Wire Feeder', image: 'solution2.png' },
      { name: 'Brazing Alloys & Fluxes', image: 'solution3.png' },
      { name: 'Thermal Spray Wires', image: 'solution2.png' },
    ],
  },
  {
    name: 'Fabrication Products',
    image: 'products2.png',
    products: [
      { name: 'Stainless Steel Electrodes', image: 'solution1.png' },
      { name: 'Mild Steel MIG Wires', image: 'solution2.png' },
      { name: 'TIG Filler Rods', image: 'solution3.png' },
      { name: 'SAW Wires & Fluxes', image: 'solution2.png' },
    ],
  },
  {
    name: 'Wear Liners & Components',
    image: 'products3.png',
    products: [
      { name: 'Chromium Carbide Plates', image: 'solution1.png' },
      { name: 'Wear Buttons & Tiles', image: 'solution2.png' },
      { name: 'Pipe Elbows & Spools', image: 'solution3.png' },
      { name: 'Impact Bars', image: 'solution2.png' },
    ],
  },
  {
    name: 'Ceramic Liners & Components',
    image: 'products4.png',
    products: [
      { name: 'Alumina Ceramic Tiles', image: 'solution1.png' },
      { name: 'Rubber-Ceramic Composites', image: 'solution2.png' },
      { name: 'Ceramic Cyclones', image: 'solution3.png' },
      { name: 'Hex Ceramic Liners', image: 'solution2.png' },
    ],
  },
  {
    name: 'Equipment',
    image: 'products2.png',
    products: [
      { name: 'MIG Welding Machines', image: 'solution1.png' },
      { name: 'Plasma Spray Systems', image: 'solution2.png' },
      { name: 'PTA Systems', image: 'solution3.png' },
      { name: 'Welding Accessories', image: 'solution2.png' },
    ],
  },
];

const SERVICES = [
  {
    name: 'Turnkey Solutions',
    image: 'turnkey-solutions1.png',
    description:
      'End-to-end project execution covering site assessment, engineering design, alloy selection, application, and post-service support — all under one roof.',
  },
  {
    name: 'Railways',
    image: 'turnkey-solutions2.png',
    description:
      'Specialized welding and hard-facing solutions for rail tracks, wheel flanges, crossings, and switches — extending asset life and reducing downtime.',
  },
  {
    name: 'ERF Services',
    image: 'turnkey-solutions3.png',
    description:
      'Expert repair and refurbishment solutions for heavy industrial components, tailored for power, cement, steel, and mining sectors.',
  },
];

const INDUSTRIES = [
  { name: 'Oil & Gas Refineries', image: 'oil-gas.png' },
  { name: 'Power', image: 'Power.png' },
  { name: 'Mining', image: 'MiningIndustry.png' },
  { name: 'Cement', image: 'cementIndustry.png' },
  { name: 'Steel', image: 'Steelindustry.png' },
  { name: 'Sugar', image: 'Sugarindustry.png' },
  { name: 'Tyre', image: 'tyreindustry.png' },
  { name: 'Port', image: 'Port.png' },
  { name: 'Road Transport', image: 'RoadTransport.png' },
  { name: 'Railways', image: 'Railway.png' },
];

async function uploadImage(strapi, filename) {
  const filepath = path.join(IMAGES_DIR, filename);
  const ext = path.extname(filename).toLowerCase();
  const stats = fs.statSync(filepath);
  const uploadService = strapi.plugin('upload').service('upload');

  const [uploaded] = await uploadService.upload({
    data: {},
    files: {
      filepath,
      originalFilename: filename,
      mimetype: MIME_TYPES[ext] || 'application/octet-stream',
      size: stats.size,
    },
  });

  return uploaded.id;
}

async function run() {
  const appContext = await compileStrapi();
  const strapi = await createStrapi(appContext).load();

  try {
    const existing = await strapi.documents('api::product-category.product-category').findMany();
    if (existing.length > 0) {
      console.log(`Already seeded (${existing.length} product categories exist) — skipping.`);
      return;
    }

    console.log('Seeding product categories + products...');
    for (const [index, category] of PRODUCT_CATEGORIES.entries()) {
      const imageId = await uploadImage(strapi, category.image);
      const created = await strapi.documents('api::product-category.product-category').create({
        data: { Name: category.name, slug: slugify(category.name), Image: imageId, order: index },
        status: 'published',
      });

      for (const [pIndex, product] of category.products.entries()) {
        const pImageId = await uploadImage(strapi, product.image);
        await strapi.documents('api::product.product').create({
          data: {
            Name: product.name,
            slug: slugify(product.name),
            Image: pImageId,
            category: created.documentId,
            order: pIndex,
          },
          status: 'published',
        });
      }
      console.log(`  - ${category.name} (${category.products.length} products)`);
    }

    console.log('Seeding services...');
    for (const [index, service] of SERVICES.entries()) {
      const imageId = await uploadImage(strapi, service.image);
      await strapi.documents('api::service.service').create({
        data: {
          Name: service.name,
          slug: slugify(service.name),
          Image: imageId,
          Description: service.description,
          order: index,
        },
        status: 'published',
      });
      console.log(`  - ${service.name}`);
    }

    console.log('Seeding industries...');
    for (const [index, industry] of INDUSTRIES.entries()) {
      const imageId = await uploadImage(strapi, industry.image);
      await strapi.documents('api::industry.industry').create({
        data: { Name: industry.name, slug: slugify(industry.name), Image: imageId, order: index },
        status: 'published',
      });
      console.log(`  - ${industry.name}`);
    }

    console.log('Done.');
  } finally {
    await strapi.destroy();
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
