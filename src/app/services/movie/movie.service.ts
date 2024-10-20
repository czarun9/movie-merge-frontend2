import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Movie, MOVIES} from '../../movies';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http: HttpClient) { }

  // getMovie(id: string): Observable<any> {
  //   return this.http.get(`https://api.example.com/movies/${id}`);
  // }
  getMovie(id: string): Observable<Movie | undefined> {
    const movie = MOVIES.find(m => m.id === Number(id));
    return of(movie);
  }

  getMovies(): Observable<Movie[]> {
    return of(MOVIES); // 'of' zamienia statyczne dane na Observable
  }
}
