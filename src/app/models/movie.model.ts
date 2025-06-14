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
  runtime: number;
}

export interface TmdbMoviePageResponse {
  movies: TmdbMovie[];
  totalPages: number;
}


export interface TraktMovieIds {
  readonly trakt: number;
  readonly slug: string;
  readonly imdb: string;
  readonly tmdb: number;
}

export interface TraktMovieComment {
  readonly id: number;
  readonly author: string;
  readonly content: string;
}

export interface TraktMovie {
  readonly title: string;
  readonly year: number;
  readonly ids: TraktMovieIds;
  readonly certification: string;
  readonly tagline: string;
  readonly overview: string;
  readonly released: string;
  readonly runtime: number;
  readonly trailer: string;
  readonly homepage: string;
  readonly language: string;
  readonly genres: readonly string[];
  readonly rating: number;
  readonly votes: number;
  readonly updatedAt: string;
  readonly availableTranslations: readonly string[];
  readonly comments: readonly TraktMovieComment[];
}
