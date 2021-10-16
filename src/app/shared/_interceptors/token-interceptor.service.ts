import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class TokenInterceptorService {

  constructor() {
  }

  /*intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('authToken');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token
        }
      });
    }
     else {
      request = request.clone({
        setHeaders: {
         
        }
      });
    }
    return next.handle(request);
  }*/
}
