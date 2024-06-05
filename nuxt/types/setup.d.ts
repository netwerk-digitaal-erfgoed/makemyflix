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

declare interface Flix {
  title: string;
  backgroundColor: string;
  uri?: string;
  branding?: Branding
  sidenote?: string;
}
