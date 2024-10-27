import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, of} from 'rxjs';
import {Movie} from '../../movies';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = `${environment.apiUrl}/api/v1/movies`;

  constructor(private http: HttpClient) { }

  getMovie(id: string): Observable<Movie | undefined> {
    return this.http.get<Movie>(`${this.apiUrl}/${id}`).pipe(
      map(response => response),
      catchError(() => of(undefined))
    );
  }

  getMovies(): Observable<Movie[] | undefined> {
    return this.http.get<Movie[]>(`${this.apiUrl}`).pipe(
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
