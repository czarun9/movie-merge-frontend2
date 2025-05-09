import {Genre} from './genre.model';
import {Review} from './review.model';

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
  reviews: Review[];
}

export interface TmdbMoviePageResponse {
  movies: TmdbMovie[];
  totalPages: number;
}
