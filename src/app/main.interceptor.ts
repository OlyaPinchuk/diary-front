import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './core/services/auth.service';
import {catchError, switchMap} from 'rxjs/operators';
import {IToken} from './core/interfaces';
import {Router} from '@angular/router';

@Injectable()
export class MainInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {
  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isAuthenticated = this.authService.isAuthenticated();
    if (isAuthenticated) {
      request = this.addToken(request, this.authService.getAccessToken());
    }
    return next.handle(request).pipe(catchError((res: HttpErrorResponse) => {
      if (res && res.error) {
        if (res.status === 401) {
          return this.handle401Error(request, next);
        }
        console.log(res.error.detail);
      }
      if (res.status === 403) {
        this.router.navigate(['login'], {
          queryParams: {
            sessionFiled: true
          }
        });
      }
    })) as any;
  }

  addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({setHeaders: {Authorization: `Bearer ${token}`}});
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): any {
    return this.authService.refreshToken().pipe(
      switchMap((token: IToken) => {
        return next.handle(this.addToken(request, token.access));
      })
    );
  }
}
