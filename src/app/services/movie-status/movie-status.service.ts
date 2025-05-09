import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, of} from 'rxjs';
import {MovieStatus} from '../../models/movie-status.model';

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
    const body = { status: isFavourite };
    console.log(isFavourite);
    return this.http.patch<void>(
      `${this.apiUrl}/movies/${movieId}/favourite`,
      body
    ).pipe(
      catchError(() => of())
    );
  }


  setWatchedStatus(movieId: string, isWatched: boolean):Observable<void> {
    const body = { status: isWatched };
    console.log(isWatched);
    return this.http.patch<void>(
      `${this.apiUrl}/movies/${movieId}/watched`,
      body
    ).pipe(
      catchError(() => of())
    );
  }

  setAddedToWatchlistStatus(movieId: string, isAddedToWatchlist: boolean):Observable<void> {
    const body = { status: isAddedToWatchlist };
    console.log("tuż przed wysłaniem" + isAddedToWatchlist);
    return this.http.patch<void>(
      `${this.apiUrl}/movies/${movieId}/watchlist`,
      body
    ).pipe(
      catchError(() => of())
    );
  }

  setRating(movieId: string, rating: number): Observable<void> {
    const body = { value: rating };
    return this.http.post<void>(
      `${this.apiUrl}/movies/${movieId}/rating`,
      body
    ).pipe(
      catchError((error) => {
        console.error('Błąd podczas wysyłania oceny:', error);
        return of();
      })
    );
  }

}
