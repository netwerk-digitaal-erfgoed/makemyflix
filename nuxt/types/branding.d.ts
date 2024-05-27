declare interface Intro {
  title: string,
  description: string,
  footer: string
};

declare interface Branding {
  name: string,
  logo: string,
  banner: string,
  intro: Intro
};
