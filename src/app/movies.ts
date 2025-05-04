export interface Movie {
  id: number;
  title: string;
  genre: string;
  year: number;
  rating: number;
  imageUrl: string;
}

export interface TmdbMovie {
  id: number;
  popularity: number;
  adult: boolean;
  title: string;
  video: boolean;
  rating: number;
  overview: string;
  revenue: number;
  media_type: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  _id: number | null;
  original_title: string;
  release_date: string;
  genres: Genre[];
  original_language: string;
}

export interface Genre {
  id : number;
  name : string;
}
export interface GenresResponse{
  genres: Genre[];
}

export interface TmdbMoviePageResponse {
  movies: TmdbMovie[];
  totalPages: number;
}

export interface MovieStatus {
  watched: boolean;
  inWatchlist: boolean;
  favourite: boolean;
  ratings: Rating[];
  latestRating: number | null;
}

export interface Rating {
  value: number;
  ratedAt: number[];
}

export const MOVIES: Movie[] = [
  {
    id: 1,
    title: 'Inception',
    genre: 'Sci-Fi',
    year: 2010,
    rating: 8.8,
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    title: 'The Dark Knight',
    genre: 'Action',
    year: 2008,
    rating: 9.0,
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    title: 'Interstellar',
    genre: 'Sci-Fi',
    year: 2014,
    rating: 8.6,
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 4,
    title: 'Seven Samurai',
    genre: 'Action',
    year: 1956,
    rating: 98,
    imageUrl: 'https://www.metacritic.com/a/img/resize/fe58469ff7c416550dbbb4ec46aa9454da7ec734/catalog/provider/5/2/5-tt0047478.jpg?auto=webp&fit=cover&height=300&width=200',
  }
]
