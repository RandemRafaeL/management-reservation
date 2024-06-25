import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, switchMap, take } from 'rxjs';
import { AuthApiService } from '../../core/auth/auth-api.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthApiService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        // Pobierz token JWT z serwisu autoryzacyjnego
        return this.authService.token$.pipe(
            take(1),
            switchMap(authToken => {
                if (authToken) {
                    request = request.clone({
                        setHeaders: {
                            Authorization: `Bearer ${authToken.access_token}`,
                        },
                    });
                }

                // Dodaj nagłówek autoryzacyjny do żądania, jeśli token istnieje
                return next.handle(request);
            })
        );
    }
}
