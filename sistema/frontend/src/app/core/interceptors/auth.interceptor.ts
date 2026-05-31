// auth.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private publicEndpoints = [
    '/api/cadastro',
    '/api/login'
  ];

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const isPublicEndpoint = this.publicEndpoints.some(endpoint => 
      req.url.includes(endpoint)
    );

    if (isPublicEndpoint) {
      console.log('🔓 Endpoint público detectado, ignorando autenticação:', req.url);
      req.headers.append('Access-Control-Allow-Origin', '*');
      console.log('Headers após modificação:', req.headers.keys());
      return next.handle(req); // Envia sem token
    }

    console.log('🔒 Interceptando requisição para:', req.url);

    // Pega o token (do localStorage ou sessionStorage)
    const token = this.authService.getToken();
    
    // Se tem token, adiciona no header
    let authReq = req;
    if (token) {
      authReq = req.clone({ 
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    // Passa adiante e trata erro 401
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Token expirado ou inválido - faz logout e redireciona
          this.authService.logout();
        }
        return throwError(() => error);
      })
    );
  }
}