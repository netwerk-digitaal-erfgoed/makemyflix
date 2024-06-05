import type { Schema, Attribute } from '@strapi/strapi';

export interface BrandingBranding extends Schema.Component {
  collectionName: 'components_branding_brandings';
  info: {
    displayName: 'branding';
    icon: 'feather';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    logo: Attribute.Media;
    banner: Attribute.Media;
    intro: Attribute.Component<'branding.intro'>;
  };
}

export interface BrandingIntro extends Schema.Component {
  collectionName: 'components_branding_intros';
  info: {
    displayName: 'intro';
    icon: 'information';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    footer: Attribute.Text;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'branding.branding': BrandingBranding;
      'branding.intro': BrandingIntro;
    }
  }
}
