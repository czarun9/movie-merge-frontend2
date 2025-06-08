import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = `${environment.apiUrl}/login`;
  private token: string | null = null;

  private loggedInSubject = new BehaviorSubject<boolean>(this.getAuthToken() !== null);
  isLoggedIn$ = this.loggedInSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email, password }, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      tap(response => {
        this.token = response.token ?? null;
        localStorage.setItem('authToken', this.token!);
        this.loggedInSubject.next(true);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    sessionStorage.clear();
    this.loggedInSubject.next(false);
    this.router.navigate(['/login']);
  }

  isTokenValid(token: string): boolean {
    try {
      const decoded: any = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp > currentTime;
    } catch (error) {
      console.error('Błąd podczas dekodowania tokena:', error);
      return false;
    }
  }
}
