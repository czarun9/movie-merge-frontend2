import { HttpRequest, HttpHandlerFn, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginService } from '../login/login.service';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const loginService = inject(LoginService);
  const authToken = loginService.getAuthToken();
  const isApiUrl = req.url.startsWith(environment.apiUrl);

  if (authToken && isApiUrl && loginService.isTokenValid(authToken)) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    console.log('Dodano nagłówek Authorization:', authToken);
  }

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        console.log('Token wygasł lub jest nieprawidłowy. Wylogowywanie użytkownika...');
        loginService.logout();
      }
      return throwError(() => new Error(error.message));
    })
  );
}
