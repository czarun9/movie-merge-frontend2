import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, Observable, of, tap} from 'rxjs';
import {environment} from '../../../environments/environment';
import {TmdbMovie, TmdbMoviePageResponse, TraktMovie} from '../../models/movie.model';
import {GenresResponse} from '../../models/genre.model';
import {ReviewPageResponse} from '../../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private readonly apiUrl = `${environment.apiUrl}/api/v1`;

  constructor(private http: HttpClient) {}

  getMovie(id: number): Observable<TmdbMovie | undefined> {
    return this.http.get<TmdbMovie>(`${this.apiUrl}/tmdb/movies/${id}`).pipe(
      catchError(error => {
        console.error('Error fetching TMDB movie:', error);
        return of(undefined);
      })
    );
  }

  discoverMovies(
    page: number = 1,
    genre?: string,
    rating?: number
  ): Observable<TmdbMoviePageResponse | undefined> {
    let params = new HttpParams().set('page', page.toString());

    if (genre) {
      params = params.set('genre', genre);
    }

    if (rating != null) {
      params = params.set('rating', rating.toString());
    }

    return this.http
      .get<TmdbMoviePageResponse>(`${this.apiUrl}/tmdb/discover`, {params})
      .pipe(
        catchError(error => {
          console.error('Error discovering movies:', error);
          return of(undefined);
        })
      );
  }

  getGenres(): Observable<GenresResponse | undefined> {
    return this.http.get<GenresResponse>(`${this.apiUrl}/tmdb/genres`).pipe(
      catchError(error => {
        console.error('Error fetching genres:', error);
        return of(undefined);
      })
    );
  }

  getMovieReviews(movieId: number, page: number = 1): Observable<ReviewPageResponse | undefined> {
    const params = new HttpParams().set('page', page.toString());

    return this.http
      .get<ReviewPageResponse>(`${this.apiUrl}/tmdb/movies/${movieId}/reviews`, {params})
      .pipe(
        catchError(error => {
          console.error('Error fetching movie reviews:', error);
          return of(undefined);
        })
      );
  }

  getTraktMovie(id: number): Observable<TraktMovie | undefined> {
    return this.http.get<TraktMovie>(`${this.apiUrl}/trakt/movies/${id}`).pipe(
      catchError(() => of(undefined))
    );
  }
}
