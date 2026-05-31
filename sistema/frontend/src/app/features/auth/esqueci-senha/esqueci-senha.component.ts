import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-esqueci-senha',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="auth-layout">
      <!-- Form Side -->
      <div class="auth-layout__form-side">
        <div class="form-section">
          <div class="form-section__header">
            <button class="back-btn" routerLink="/login" id="back-to-login" aria-label="Voltar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 12H5M5 12l7-7M5 12l7 7"/>
              </svg>
            </button>
            <h1 style="margin-top: 16px;">Recuperação de senha</h1>
            <p>Por favor, forneça o endereço de e-mail cadastrado para que possamos enviar o link de recuperação.</p>
          </div>

          <div class="form-section__fields">
            <div class="section-label">Email registrado na plataforma</div>

            <div class="ds-input-wrap">
              <label>Email</label>
              <div class="ds-input">
                <input
                  id="recovery-email"
                  type="email"
                  [(ngModel)]="email"
                  placeholder=""
                  autocomplete="email"
                />
              </div>
            </div>
          </div>

          <div class="form-section__actions" style="gap: 12px; display: flex; flex-direction: column;">
            <button class="btn btn--secondary" routerLink="/login" id="btn-voltar">
              Voltar
            </button>
            <button
              class="btn btn--ghost"
              id="btn-redefinir"
              [disabled]="!email"
              (click)="onRedefinir()">
              Redefinir senha
            </button>
          </div>
        </div>
      </div>

      <!-- Photo Side -->
      <div class="auth-layout__photo-side">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80"
          alt="Escritório de engenharia LAD"
        />
      </div>
    </div>
  `,
  styles: [`
    .section-label {
      font-size: 14px;
      font-weight: 500;
      color: #15161C;
      margin-bottom: -8px;
    }
  `]
})
export class EsqueciSenhaComponent {
  email = '';

  onRedefinir() {
    alert('Link de recuperação enviado para ' + this.email);
  }
}
