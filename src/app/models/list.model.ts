export interface ListItem {
  id: string;
  movieTmdbId: number;
  title: string;
  release_date?: string;
  rating?: number;
  date?: string;
  content?: string;
  author?: string;
  posterUrl?: string;
  createdAt?: string;
}

export interface UserMovieListItem {
  id: string;
  name: string;
  createdAt: string | number[];
}

