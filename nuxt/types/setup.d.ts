declare interface Intro {
  title: string;
  description: string;
  footer: string;
}

declare interface UploadedImageFormat {
  name: string;
  url: string;
  width: number;
  height: number;
  ext: string;
  mime: string;
}

declare interface UploadedImage extends UploadedImageFormat {
  id: number;
  formats: UploadedImageFormat[];
}

declare interface Branding {
  name: string;
  logo: UploadedImage;
  banner: UploadedImage;
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
  logo?: UploadedImage | File | null;
  banner?: UploadedImage | File | null;
  primaryColor?: string;
  secondaryColor?: string;
  tertiaryColor?: string;
  fontFamily?: string;
}
