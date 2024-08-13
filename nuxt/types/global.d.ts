interface To {
  name: string;
  params: Record<string, string>;
}

interface ArtworkState {
  pageSize: number;
  page: number;
  artworks: Artwork[];
  category?: Category;
}

interface StrapiEntity<T> {
  id: string;
  attributes: T;
}

interface StrapiApiResponse<T> {
  data: T;
}

type PreviewMediaQuery = 'laptop' | 'tablet' | 'cellphone';
