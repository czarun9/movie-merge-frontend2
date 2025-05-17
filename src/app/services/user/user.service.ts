import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';
import {ListItem, CustomList} from '../../models/list.model';

interface PaginatedResponse<T> {
  content: T[];
  pageable: any;
  totalPages: number;
  totalElements: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/api/v1/user`;

  constructor(private http: HttpClient) {}

  getUserFavorites(page: number = 0, size: number = 10): Observable<PaginatedResponse<ListItem>> {
    return this.http.get<PaginatedResponse<ListItem>>(`${this.apiUrl}/favorites?page=${page}&size=${size}`);
  }

  getUserWatchlist(page: number = 0, size: number = 10): Observable<PaginatedResponse<ListItem>> {
    return this.http.get<PaginatedResponse<ListItem>>(`${this.apiUrl}/watchlist?page=${page}&size=${size}`);
  }

  getUserRatings(page: number = 0, size: number = 10): Observable<PaginatedResponse<ListItem>> {
    return this.http.get<PaginatedResponse<ListItem>>(`${this.apiUrl}/ratings?page=${page}&size=${size}`);
  }

  getUserWatched(page: number = 0, size: number = 10): Observable<PaginatedResponse<ListItem>> {
    return this.http.get<PaginatedResponse<ListItem>>(`${this.apiUrl}/watched?page=${page}&size=${size}`);
  }

  getUserMovieLists(): Observable<CustomList[]> {
    return this.http.get<CustomList[]>(`${this.apiUrl}/lists`);
  }

  getUserMovieListItems(listId: string, page: number, size: number) {
    return this.http.get<PaginatedResponse<ListItem>>(`${this.apiUrl}/lists/${listId}/items?page=${page}&size=${size}`);
  }

  getUserMovieList(listId: string) {
    return this.http.get<CustomList>(`${this.apiUrl}/lists/${listId}`);
  }

  removeItemFromSection(sectionName: string, itemId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${sectionName}/${itemId}`);
  }

  removeMovieFromCustomList(listId: string, movieTmdbId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/lists/${listId}/item/${movieTmdbId}`);
  }

}
