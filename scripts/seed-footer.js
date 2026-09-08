'use strict';

/**
 * One-time, idempotent seed for the footer menu columns.
 * Mirrors the site's previous hardcoded footer links so the site doesn't
 * regress visually until an editor curates real content in the CMS.
 *
 * Run once from `backend/`: node scripts/seed-footer.js
 * Safe to re-run — skips seeding if footer columns already exist.
 */

const { createStrapi, compileStrapi } = require('@strapi/strapi');

const FOOTER_COLUMNS = [
  {
    heading: 'Products',
    links: [
      { label: 'By Category', href: '#' },
      { label: 'By Process', href: '#' },
      { label: 'By Technology', href: '#' },
      { label: 'By Metal Type', href: '#' },
      { label: 'By Brand', href: '#' },
    ],
  },
  {
    heading: 'Services',
    links: [
      { label: 'Turnkey Solutions', href: '#' },
      { label: 'Railways', href: '#' },
      { label: 'ERF', href: '#' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us', href: '#' },
      { label: 'R&D Centre', href: '#' },
      { label: 'EWAC Institute', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Our Clients', href: '#' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Contact Us', href: '/contact-us' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms & Conditions', href: '#' },
      { label: 'Testimonials', href: '#' },
    ],
  },
];

async function run() {
  const appContext = await compileStrapi();
  const strapi = await createStrapi(appContext).load();

  try {
    const existing = await strapi.documents('api::footer-column.footer-column').findMany();
    if (existing.length > 0) {
      console.log(`Already seeded (${existing.length} footer columns exist) — skipping.`);
      return;
    }

    console.log('Seeding footer columns...');
    for (const [index, column] of FOOTER_COLUMNS.entries()) {
      await strapi.documents('api::footer-column.footer-column').create({
        data: {
          Heading: column.heading,
          order: index,
          links: column.links.map((link) => ({ Label: link.label, Href: link.href })),
        },
        status: 'published',
      });
      console.log(`  - ${column.heading} (${column.links.length} links)`);
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
