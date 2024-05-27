declare interface CategoryResponse {
  id: string,
  name: string,
  numberOfHeritageObjects: string,
  startDate?: string,
  endDate?: string,
  description?: string
}

declare interface Category {
  id: string,
  originalId: string,
  image?: string,
  numberOfArtworks?: number,
  period?: string,
  title: string,
  description?: string
}
