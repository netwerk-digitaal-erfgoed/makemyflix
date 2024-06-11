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
