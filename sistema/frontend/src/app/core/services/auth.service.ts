// auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'access_token';
  private readonly API_URL = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // Login - guarda token e retorna dados do usuário
  async login(email: string, senha: string): Promise<any> {
    const response = await lastValueFrom(
      this.http.post<{ token: string; user: any }>(`${this.API_URL}/login`, { email, senha })
    );
    
    // Salva token
    this.setToken(response.token);
    return response.user;
  }

  // Logout - remove token e redireciona
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  // Salva token
  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  // Recupera token
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Verifica se está logado
  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    // Opcional: verificar se token expirou (sem chamar API)
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }
}