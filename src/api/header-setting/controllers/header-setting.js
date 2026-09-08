'use strict';

/**
 * header-setting controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

const DEFAULTS = {
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

module.exports = createCoreController('api::header-setting.header-setting', {
  async find(ctx) {
    const entity = await strapi.db.query('api::header-setting.header-setting').findOne({
      populate: { TopBar: true, ProductsDropdown: true, ServicesDropdown: true, IndustriesDropdown: true, NavLinks: true },
    });

    if (!entity) {
      return ctx.send(DEFAULTS);
    }

    return ctx.send({
      TopBar: entity.TopBar || DEFAULTS.TopBar,
      ProductsDropdown: entity.ProductsDropdown || DEFAULTS.ProductsDropdown,
      ServicesDropdown: entity.ServicesDropdown || DEFAULTS.ServicesDropdown,
      IndustriesDropdown: entity.IndustriesDropdown || DEFAULTS.IndustriesDropdown,
      NavLinks: entity.NavLinks && entity.NavLinks.length > 0 ? entity.NavLinks : DEFAULTS.NavLinks,
    });
  },
});
