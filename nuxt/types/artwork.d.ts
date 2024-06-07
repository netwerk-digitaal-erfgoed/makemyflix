declare interface ArtProperties extends Record<string, any> {};

declare interface Artwork {
  id: string,
  originalId: string,
  categoryId: string,
  title?: string,
  subTitle?: string,
  description?: string,
  image?: string,
  properties: ArtProperties
}
