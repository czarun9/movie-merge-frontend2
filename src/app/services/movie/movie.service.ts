import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, of} from 'rxjs';
import {Movie, TmdbMovie} from '../../movies';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = `${environment.apiUrl}/api/v1`;

  constructor(private http: HttpClient) { }

  getMovie(id: string): Observable<Movie | undefined> {
    return this.http.get<Movie>(`${this.apiUrl}/movies/${id}`).pipe(
      map(response => response),
      catchError(() => of(undefined))
    );
  }

  getMovies(): Observable<Movie[] | undefined> {
    return this.http.get<Movie[]>(`${this.apiUrl}/movies`).pipe(
      map(response => response),
      catchError(() => of(undefined))
    );
  }

  discoverMovies(): Observable<TmdbMovie[] | undefined> {
    return this.http.get<TmdbMovie[]>(`${this.apiUrl}/tmdb/discover`).pipe(
      map(response => response),
      catchError(() => of(undefined))
    );
  }

  // getMovie(id: string): Observable<Movie | undefined> {
  //   const movie = MOVIES.find(m => m.id === Number(id));
  //   return of(movie);
  // }

  // getMovies(): Observable<Movie[]> {
  //   return of(MOVIES); // 'of' zamienia statyczne dane na Observable
  // }
}
