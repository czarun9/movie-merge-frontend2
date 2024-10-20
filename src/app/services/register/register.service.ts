import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private apiUrl = `${environment.apiUrl}/register`;

  constructor(private http: HttpClient) {
  }

  register(email: string, password: string): Observable<any> {
    const requestBody = {
      email: email,
      password: password
    };

    return this.http.post<any>(this.apiUrl, requestBody, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
