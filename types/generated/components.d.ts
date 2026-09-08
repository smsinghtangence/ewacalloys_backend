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
      'slider.slider': SliderSlider;
    }
  }
}
