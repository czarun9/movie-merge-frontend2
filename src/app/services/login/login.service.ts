import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {Router} from '@angular/router';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = `${environment.apiUrl}/login`;
  private token: string | null = null;

  constructor(private http: HttpClient, private router: Router) {
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, {email, password}, {
        headers: {'Content-Type': 'application/json'}
      }
    ).pipe(
      tap(response => {
        this.token = response.token ?? null;
        localStorage.setItem('authToken', this.token!);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    sessionStorage.clear();

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
