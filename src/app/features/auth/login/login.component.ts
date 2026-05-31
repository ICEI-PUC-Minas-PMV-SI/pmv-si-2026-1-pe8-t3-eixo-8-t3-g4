import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="auth-layout">
      <!-- Form Side -->
      <div class="auth-layout__form-side">
        <div class="form-section">
          <div class="form-section__header">
            <div class="login-logo">
              <img src="logo-lad.png" alt="LAD Engenharia" />
            </div>
            <h1>Acesse sua conta.</h1>
          </div>

          <div class="form-section__fields">
            <!-- Email Input -->
            <div class="ds-input-wrap">
              <label>Email</label>
              <div class="ds-input">
                <input
                  id="login-email"
                  type="email"
                  [(ngModel)]="email"
                  placeholder=""
                  autocomplete="email"
                />
              </div>
            </div>

            <!-- Senha Input -->
            <div class="ds-input-wrap">
              <label>Senha</label>
              <div class="ds-input">
                <input
                  id="login-password"
                  [type]="showPassword ? 'text' : 'password'"
                  [(ngModel)]="password"
                  placeholder=""
                  autocomplete="current-password"
                />
                <button class="icon-btn" (click)="showPassword = !showPassword" type="button" aria-label="Alternar visibilidade da senha">
                  <svg *ngIf="!showPassword" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                  <svg *ngIf="showPassword" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Esqueci Senha -->
            <div class="forgot-link">
              <a routerLink="/esqueci-senha" id="forgot-password-link">Esqueci minha senha.</a>
            </div>
          </div>

          <div class="form-section__actions">
            <button
              id="login-btn"
              class="btn btn--ghost"
              (click)="onLogin()"
              [disabled]="!email || !password">
              Login
            </button>

            <div class="form-section__link-row">
              <span>Não tem conta?</span>
              <a routerLink="/criar-conta" id="criar-conta-link">Criar conta</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Photo Side -->
      <div class="auth-layout__photo-side">
        <img
          src="escritorio-lad.jpg"
          alt="Escritório de engenharia LAD"
        />
      </div>
    </div>
  `,
  styles: [`
    .login-logo {
      margin-bottom: 24px;

      img {
        height: 40px;
        width: auto;
      }
    }

    .forgot-link {
      display: flex;
      justify-content: center;
      padding-top: 8px;

      a {
        font-family: 'Inter', sans-serif;
        font-weight: 700;
        font-size: 14px;
        color: #15161C;
        text-decoration: none;
        cursor: pointer;

        &:hover { text-decoration: underline; }
      }
    }
  `]
})


export class LoginComponent {
  email = '';
  password = '';
  showPassword = false;
  loginError = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
    if (!this.email || !this.password) {
      this.loginError = true;
      this.errorMessage = 'Email e senha são obrigatórios';
      return;
    }

    this.authService.login(this.email, this.password)
      .then((response: any) => {
        if (response?.token) {
          localStorage.setItem('auth_token', response.token);
        }
        this.router.navigate(['/cadastros']);
      })
      .catch((error: any) => {
        this.loginError = true;
        this.errorMessage = error.status === 401
          ? 'Email ou senha inválidos'
          : 'Erro ao realizar login';
      });
  }
}
