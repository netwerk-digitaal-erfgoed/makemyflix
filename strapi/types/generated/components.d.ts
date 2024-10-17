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

export interface DataConnectionDataConnection extends Schema.Component {
  collectionName: 'components_data_connection_data_connections';
  info: {
    displayName: 'Data connection';
    icon: 'oneToMany';
    description: '';
  };
  attributes: {
    endpointUrl: Attribute.Text & Attribute.Required;
    categoryQuery: Attribute.Text & Attribute.Required;
    itemsQuery: Attribute.Text & Attribute.Required;
  };
}

export interface SeoSeo extends Schema.Component {
  collectionName: 'components_seo_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    ogTitle: Attribute.String;
    ogDescription: Attribute.Text;
    ogImage: Attribute.Media;
    twitterTitle: Attribute.String;
    twitterDescription: Attribute.Text;
    twitterImage: Attribute.Media;
  };
}

export interface ThemingLabels extends Schema.Component {
  collectionName: 'components_theming_labels';
  info: {
    displayName: 'labels';
  };
  attributes: {
    dateCreated: Attribute.String;
    imageLicenseURI: Attribute.String;
    creators: Attribute.String;
    contentLocationURIs: Attribute.String;
    provinceURI: Attribute.String;
    publisherURI: Attribute.String;
  };
}

export interface ThemingTheming extends Schema.Component {
  collectionName: 'components_theming_themings';
  info: {
    displayName: 'theming';
    description: '';
  };
  attributes: {
    font: Attribute.Enumeration<
      [
        'Roboto',
        'Open Sans',
        'Lato',
        'Montserrat',
        'Roboto Condensed',
        'Oswald',
        'Poppins',
        'Raleway',
        'Slabo 27px',
        'PT Sans',
        'Noto Sans',
        'Roboto Mono',
        'Roboto Slab',
        'Ubuntu',
        'Merriweather',
        'Lora',
        'Playfair Display',
        'Inter',
        'Nunito',
        'PT Serif',
        'Times New Roman',
      ]
    >;
    primary: Attribute.String & Attribute.CustomField<'plugin::color-picker.color'>;
    secondary: Attribute.String & Attribute.CustomField<'plugin::color-picker.color'>;
    tertiary: Attribute.String & Attribute.CustomField<'plugin::color-picker.color'>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'branding.branding': BrandingBranding;
      'branding.intro': BrandingIntro;
      'data-connection.data-connection': DataConnectionDataConnection;
      'seo.seo': SeoSeo;
      'theming.labels': ThemingLabels;
      'theming.theming': ThemingTheming;
    }
  }
}
