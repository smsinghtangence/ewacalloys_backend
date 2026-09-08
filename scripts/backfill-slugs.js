'use strict';

/**
 * One-off fix: seed-catalog.js's first run predated explicit slug generation,
 * leaving every entry's `slug` field null. Backfills them from `Name`.
 * Safe to re-run — skips entries that already have a slug.
 */

const { createStrapi, compileStrapi } = require('@strapi/strapi');

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const UIDS = [
  'api::product-category.product-category',
  'api::product.product',
  'api::service.service',
  'api::industry.industry',
];

async function run() {
  const appContext = await compileStrapi();
  const strapi = await createStrapi(appContext).load();

  try {
    for (const uid of UIDS) {
      const entries = await strapi.documents(uid).findMany({ status: 'published' });
      for (const entry of entries) {
        if (entry.slug) continue;
        await strapi.documents(uid).update({
          documentId: entry.documentId,
          data: { slug: slugify(entry.Name) },
          status: 'published',
        });
        console.log(`  ${uid}: "${entry.Name}" -> ${slugify(entry.Name)}`);
      }
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
