import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AddTokenInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = `eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJqdGkiOjQxNDgsInN1YiI6IkFMVEFDRU5UUk8iLCJpYXQiOjE2OTY4NTk0MTEsImV4cCI6MTY5Njg4MTAxMX0.heNQ5oygPG8p0IMR2twT5komqUjFwSTW6-85IIYxLZvkIfmZd7ry-jXBJAE9WREnPTHBoK1VJWUfckGF4kEh1Q`;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Accept: 'Application/json',
    });
    const authReq = req.clone({
      headers: headers,
    });

    return next.handle(authReq);
  }
}
