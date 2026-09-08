'use strict';

/**
 * One-time, idempotent seed for the header settings singleton.
 * Mirrors the site's previous hardcoded header content so the site doesn't
 * regress visually until an editor curates real content in the CMS.
 *
 * Run once from `backend/`: node scripts/seed-header.js
 * Safe to re-run — skips seeding if a header-setting entry already exists.
 */

const { createStrapi, compileStrapi } = require('@strapi/strapi');

const DATA = {
  TopBar: {
    Label: 'NEWS',
    Message: 'WAC at Wire India 2025 — Hall 3, Stall B-42 · Mumbai · Nov 12–14',
    CtaLabel: 'Register Now →',
    CtaHref: '#',
  },
  ProductsDropdown: {
    Eyebrow: 'What We Make',
    Title: 'Our Products',
    Description:
      'High-performance welding consumables and wear protection solutions for demanding environments.',
    ExploreLabel: 'Explore All',
    ExploreHref: '#',
  },
  ServicesDropdown: {
    Eyebrow: 'What We Do',
    Title: 'Our Services',
    Description: "Comprehensive on-site and in-house solutions across India's critical industrial sectors.",
    ExploreLabel: 'Explore All',
    ExploreHref: '#',
  },
  IndustriesDropdown: {
    Eyebrow: 'What We Serve',
    Title: 'Industries We Serve',
    Description: "Decades of expertise across India's most demanding industrial sectors.",
    ExploreLabel: 'Explore All',
    ExploreHref: '#',
  },
  NavLinks: [
    { Label: 'About', Href: '/about' },
    { Label: 'Insights', Href: '/insights' },
    { Label: 'Careers', Href: '#' },
  ],
};

async function run() {
  const appContext = await compileStrapi();
  const strapi = await createStrapi(appContext).load();

  try {
    const existing = await strapi.documents('api::header-setting.header-setting').findFirst();
    if (existing) {
      console.log('Already seeded — skipping.');
      return;
    }

    console.log('Seeding header settings...');
    await strapi.documents('api::header-setting.header-setting').create({
      data: DATA,
      status: 'published',
    });
    console.log('Done.');
  } finally {
    await strapi.destroy();
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
