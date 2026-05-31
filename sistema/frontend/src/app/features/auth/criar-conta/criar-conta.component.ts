import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

interface StepData {
  email: string;
  nome: string;
  senha: string;
  confirmarSenha: string;
}

@Component({
  selector: 'app-criar-conta',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="auth-layout">
      <!-- Form Side -->
      <div class="auth-layout__form-side">

        <!-- Step 1: Email -->
        <div class="form-section" *ngIf="step === 1">
          <div class="form-section__header">
            <button class="back-btn" routerLink="/login" aria-label="Voltar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 12H5M5 12l7-7M5 12l7 7"/>
              </svg>
            </button>
            <h1 style="margin-top: 16px;">Nova conta</h1>
            <p>Insira seu melhor e-mail para começar sua jornada aqui.</p>
          </div>

          <div class="form-section__fields">
            <div class="ds-input-wrap">
              <label>Email</label>
              <div class="ds-input">
                <input
                  id="cc-email"
                  type="email"
                  [(ngModel)]="data.email"
                  autocomplete="email"
                />
                <button class="icon-btn" type="button" aria-label="Email">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div class="form-section__actions">
            <button class="btn btn--ghost" id="btn-avancar-1" [disabled]="!data.email" (click)="nextStep()">Avançar</button>
            <button class="btn btn--secondary" routerLink="/login" id="btn-voltar-1">Voltar</button>
          </div>
        </div>

        <!-- Step 2: Nome e Sobrenome -->
        <div class="form-section" *ngIf="step === 2">
          <div class="form-section__header">
            <button class="back-btn" (click)="prevStep()" aria-label="Voltar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 12H5M5 12l7-7M5 12l7 7"/>
              </svg>
            </button>
            <h1 style="margin-top: 16px;">Seus dados</h1>
            <p>Precisamos de algumas informações para criar seu perfil.</p>
          </div>

          <div class="form-section__fields">
            <div class="ds-input-wrap">
              <label>Nome</label>
              <div class="ds-input">
                <input id="cc-nome" type="text" [(ngModel)]="data.nome" autocomplete="given-name"/>
              </div>
            </div>
          </div>

          <div class="form-section__actions">
            <button class="btn btn--ghost" id="btn-avancar-2" [disabled]="!data.nome" (click)="nextStep()">Avançar</button>
            <button class="btn btn--secondary" (click)="prevStep()" id="btn-voltar-2">Voltar</button>
          </div>
        </div>

        <!-- Step 3: Senha -->
        <div class="form-section" *ngIf="step === 3">
          <div class="form-section__header">
            <button class="back-btn" (click)="prevStep()" aria-label="Voltar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 12H5M5 12l7-7M5 12l7 7"/>
              </svg>
            </button>
            <h1 style="margin-top: 16px;">Crie sua senha</h1>
            <p>Use pelo menos 8 caracteres combinando letras e números.</p>
          </div>

          <div class="form-section__fields">
            <div class="ds-input-wrap">
              <label>Senha</label>
              <div class="ds-input">
                <input id="cc-senha" [type]="showSenha ? 'text' : 'password'" [(ngModel)]="data.senha" autocomplete="new-password"/>
                <button class="icon-btn" (click)="showSenha = !showSenha" type="button" aria-label="Mostrar senha">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>
              </div>
            </div>
            <div class="ds-input-wrap">
              <label>Confirmar senha</label>
              <div class="ds-input" [class.ds-input-wrap--error]="data.confirmarSenha && data.senha !== data.confirmarSenha">
                <input id="cc-confirmar-senha" [type]="showSenha ? 'text' : 'password'" [(ngModel)]="data.confirmarSenha" autocomplete="new-password"/>
              </div>
            </div>
          </div>

          <div class="form-section__actions">
            <button class="btn btn--ghost" id="btn-criar" [disabled]="!data.senha || data.senha !== data.confirmarSenha" (click)="onCreate()">Criar conta</button>
            <button class="btn btn--secondary" (click)="prevStep()" id="btn-voltar-3">Voltar</button>
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
  styles: []
})
export class CriarContaComponent {
  step = 1;
  showSenha = false;
  loading = false;
  errorMessage = '';

  data: StepData = {
    email: '',
    nome: '',
    senha: '',
    confirmarSenha: ''
  };

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  nextStep() { this.step++; }
  prevStep() { this.step--; }

  async onCreate() {
    // Validação básica antes de enviar
    if (!this.data.email || !this.data.nome || !this.data.senha) {
      this.errorMessage = 'Por favor, preencha todos os campos obrigatórios.';
      return;
    }

    if (this.data.senha !== this.data.confirmarSenha) {
      this.errorMessage = 'As senhas não conferem.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    // Preparar payload para envio
    const payload = {
      email: this.data.email,
      nome: this.data.nome,
      senha: this.data.senha
    };

    try {
      // Chamada à API
      const response = await this.http.post<any>(
        `${environment.apiUrl}/cadastro`,
        payload
      ).toPromise();

      // Armazenar o retorno da API (exemplos)
      console.log('Resposta da API:', response);
      
      // Se quiser armazenar no localStorage/sessionStorage
      if (response && response.token) {
        localStorage.setItem('access_token', response.token);
      }
      
      if (response && response.user) {
        localStorage.setItem('user_data', JSON.stringify(response.user));
      }
      
      // Redirecionar após sucesso
      this.router.navigate(['/login']);
      
    } catch (error: any) {
      // Tratamento de erro
      console.error('Erro no cadastro:', error);
      
      if (error.status === 400) {
        this.errorMessage = error.error?.message || 'Dados inválidos. Verifique as informações.';
      } else if (error.status === 409) {
        this.errorMessage = 'Este email já está cadastrado.';
      } else if (error.status === 500) {
        this.errorMessage = 'Erro no servidor. Tente novamente mais tarde.';
      } else {
        this.errorMessage = 'Erro ao criar conta. Verifique sua conexão e tente novamente.';
      }
      
    } finally {
      this.loading = false;
    }
  }
}
