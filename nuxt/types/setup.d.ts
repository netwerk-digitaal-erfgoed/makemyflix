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
  title: string;
  uri?: string;
  branding?: Branding;
  sidenote?: string;
  theme?: Theme;
  labels?: Record<string, string>;
  seo?: Seo;
}
