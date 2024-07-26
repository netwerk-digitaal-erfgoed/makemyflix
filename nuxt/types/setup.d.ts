declare interface Intro {
  title: string;
  description: string;
  footer: string;
}

declare interface Branding {
  name: string;
  logo: string;
  banner: string;
  intro: Intro;
}

declare interface Theme {
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
  fontFamily: string;
}

declare interface Seo {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
}

declare interface Flix {
  id: string;
  uri?: string;
  fallback?: boolean;
  theme?: Theme;
  branding?: Branding;
  sidenote?: string;
  labels?: Record<string, string>;
  seo?: Seo;
}

declare interface FlixData {
  endpoint?: string;
  categoryQuery?: string;
  itemsQuery?: string;
  title?: string;
  description?: string;
  logo?: string;
  banner?: string;
  primaryColor?: string;
  secondaryColor?: string;
  tertiaryColor?: string;
  fontFamily?: string;
}
