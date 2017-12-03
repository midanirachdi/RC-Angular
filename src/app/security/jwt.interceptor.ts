import { Injectable } from '@angular/core';
import {LOGIN_URL} from '../services/java.urls';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class jwtInterceptor implements HttpInterceptor{

  constructor() {}

  public getToken(): string {
    return localStorage.getItem('token');
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('intercept');
    if(request.url!=LOGIN_URL)
    { request = request.clone({
      setHeaders: {
        Authorization: this.getToken()
      }
    });
  }


    return next.handle(request);
  }

}