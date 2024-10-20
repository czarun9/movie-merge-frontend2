import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = `${environment.apiUrl}/login`;
  private token: string | null = null;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email, password }, {
      headers: { 'Content-Type': 'application/json' }
    }
    ).pipe(
      tap(response => {
        this.token = response.token ?? null;
        localStorage.setItem('jwtToken', this.token!);
      })
    );
  }

}
