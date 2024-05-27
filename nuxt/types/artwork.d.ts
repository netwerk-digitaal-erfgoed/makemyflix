interface Painting {
  name?: string
}

interface Church {
  identifier?: string,
  provinceURI?: string,
  provinceName?: string,
  contentLocationsURIs?: string,
  contentLocationNames?: string
}

declare interface ArtworkResponse extends Painting, Church {
  heritageObject: string,
  description?: string,
  dateCreated?: string,
  imageURI?: string,
  imageLicenseURI?: string,
  imageLicenseName?: string,
  publisherURI?: string,
  publisherName?: string,
  publisherHomepage?: string,
  creators?: string,
  creatorNames?: string,
};

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
