import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, of} from 'rxjs';
import {MovieStatus} from '../../movies';

@Injectable({
  providedIn: 'root'
})
export class MovieStatusService {
  private apiUrl = `${environment.apiUrl}/api/v1`;

  constructor(private http: HttpClient) {
  }

  getMovieStatus(movieId: any): Observable<MovieStatus | undefined> {
    return this.http
      .get<MovieStatus>(`${this.apiUrl}/movies/${movieId}/status`).pipe(
        map(response => response),
        catchError(() => of(undefined))
      );
  }

  setFavouriteStatus(movieId: string, isFavourite: boolean): Observable<void> {
    const body = { favourite: isFavourite };
    console.log(isFavourite);
    return this.http.patch<void>(
      `${this.apiUrl}/movies/${movieId}/favourite`,
      body
    ).pipe(
      catchError(() => of())
    );
  }


}
