import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, map, Observable, of} from 'rxjs';
import {GenresResponse, TmdbMovie, TmdbMoviePageResponse} from '../../movies';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = `${environment.apiUrl}/api/v1`;

  constructor(private http: HttpClient) {
  }

  getMovie(id: string): Observable<TmdbMovie | undefined> {
    return this.http.get<TmdbMovie>(`${this.apiUrl}/tmdb/movies/${id}`).pipe(
      map(response => response),
      catchError(() => of(undefined))
    );
  }

  discoverMovies(
    page: number = 1,
    genre?: string,
    rating?: number
  ): Observable<TmdbMoviePageResponse | undefined> {
    let params = new HttpParams()
      .set('page', page.toString());

    if (genre) {
      params = params.set('genre', genre);
    }

    if (rating != null) {
      params = params.set('rating', rating.toString());
    }

    return this.http
      .get<TmdbMoviePageResponse>(`${this.apiUrl}/tmdb/discover`, {params})
      .pipe(
        map(response => response),
        catchError(() => of(undefined))
      );
  }


  getGenres(): Observable<GenresResponse | undefined> {
    return this.http.get<GenresResponse>(`${this.apiUrl}/tmdb/genres`).pipe(
      map(response => response),
      catchError(() => of(undefined))
    );
  }
}
