declare interface ArtProperties extends Record<string, any> {}

declare interface Artwork {
  id: string;
  categoryId: string;
  slug: string;
  title?: string;
  subTitle?: string;
  description?: string;
  image?: string;
  properties: ArtProperties;
}
