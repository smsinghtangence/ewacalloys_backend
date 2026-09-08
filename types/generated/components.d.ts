import type { Schema, Struct } from '@strapi/strapi';

export interface FaqFaq extends Struct.ComponentSchema {
  collectionName: 'components_faq_faqs';
  info: {
    displayName: 'FAQ';
  };
  attributes: {
    Description: Schema.Attribute.Text;
    Heading: Schema.Attribute.String;
  };
}

export interface FooterFooterLink extends Struct.ComponentSchema {
  collectionName: 'components_footer_footer_links';
  info: {
    displayName: 'Footer Link';
  };
  attributes: {
    Href: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#'>;
    Label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface MetaSectionMetaSection extends Struct.ComponentSchema {
  collectionName: 'components_meta_section_meta_sections';
  info: {
    displayName: 'MetaSection';
  };
  attributes: {
    MetaDescription: Schema.Attribute.Text;
    MetaKeyword: Schema.Attribute.String;
    MetaRobots: Schema.Attribute.Enumeration<
      [
        'index,follow',
        'noindex,nofollow',
        'index,nofollow',
        'noindex,follow',
        'index',
        'follow',
      ]
    >;
    MetaTitle: Schema.Attribute.String;
  };
}

export interface NavDropdownCopy extends Struct.ComponentSchema {
  collectionName: 'components_nav_dropdown_copies';
  info: {
    displayName: 'Dropdown Copy';
  };
  attributes: {
    Description: Schema.Attribute.Text;
    ExploreHref: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#'>;
    ExploreLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Explore All'>;
    Eyebrow: Schema.Attribute.String;
    Title: Schema.Attribute.String;
  };
}

export interface NavNavLink extends Struct.ComponentSchema {
  collectionName: 'components_nav_nav_links';
  info: {
    displayName: 'Nav Link';
  };
  attributes: {
    Href: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#'>;
    Label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface NavTopBar extends Struct.ComponentSchema {
  collectionName: 'components_nav_top_bars';
  info: {
    displayName: 'Top Bar';
  };
  attributes: {
    CtaHref: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#'>;
    CtaLabel: Schema.Attribute.String;
    Label: Schema.Attribute.String & Schema.Attribute.DefaultTo<'NEWS'>;
    Message: Schema.Attribute.String;
  };
}

export interface SliderSlider extends Struct.ComponentSchema {
  collectionName: 'components_slider_sliders';
  info: {
    displayName: 'Slider';
  };
  attributes: {
    Description: Schema.Attribute.Text;
    Heading: Schema.Attribute.String;
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    MobileImage: Schema.Attribute.Media<'images' | 'videos'>;
    SubHeading: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'faq.faq': FaqFaq;
      'footer.footer-link': FooterFooterLink;
      'meta-section.meta-section': MetaSectionMetaSection;
      'nav.dropdown-copy': NavDropdownCopy;
      'nav.nav-link': NavNavLink;
      'nav.top-bar': NavTopBar;
      'slider.slider': SliderSlider;
    }
  }
}
