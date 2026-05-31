import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';

interface AtividadeRecente {
  projeto: string;
  cliente: string;
  valor: string;
  margem: string;
  status: 'Aprovado' | 'Pendente' | 'Concluído';
}

interface OrcamentoHistorico {
  numero: string;
  projeto: string;
  cliente: string;
  data: string;
  valor: string;
  status: 'Aprovado' | 'Pendente' | 'Concluído';
}

@Component({
  selector: 'app-relatorios',
  standalone: true,
  imports: [CommonModule, SidebarComponent, FormsModule],
  template: `
    <div class="app-shell">
      <app-sidebar />
      <main class="app-content">

        <div class="page-header">
          <h1>Relatórios</h1>
        </div>

        <!-- Tabs -->
        <div class="tabs">
          <button
            class="tabs__item"
            [class.active]="activeTab === 'dashboard'"
            (click)="activeTab = 'dashboard'"
            id="tab-dashboard">
            Dashboard KPI
          </button>
          <button
            class="tabs__item"
            [class.active]="activeTab === 'historico'"
            (click)="activeTab = 'historico'"
            id="tab-historico">
            Histórico de Orçamentos
          </button>
          <button
            class="tabs__item"
            [class.active]="activeTab === 'busca'"
            (click)="activeTab = 'busca'"
            id="tab-busca">
            Busca Global
          </button>
        </div>

        <div class="tab-content" style="padding: 0 24px 24px;">

          <!-- ── DASHBOARD KPI ─────────────────────────────────── -->
          <div *ngIf="activeTab === 'dashboard'">
            <!-- KPI Cards -->
            <div class="kpi-grid">
              <div class="kpi-card" id="kpi-total-orcamentos">
                <div class="kpi-card__header">
                  <h3>Total de Orçamentos Ativos</h3>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#929395" stroke-width="1.5">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10 9 9 9 8 9"/>
                  </svg>
                </div>
                <div class="kpi-card__value">{{ totalOrcamentos }}</div>
                <div class="kpi-card__label">Orçamentos aprovados e pendentes</div>
              </div>

              <div class="kpi-card" id="kpi-margem-media">
                <div class="kpi-card__header">
                  <h3>Margem Média</h3>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#929395" stroke-width="1.5">
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
                    <polyline points="16 7 22 7 22 13"/>
                  </svg>
                </div>
                <div class="kpi-card__value kpi-card__value--brand">{{ mediaMargemLucro }}%</div>
                <div class="kpi-card__label">Em todos os projetos</div>
              </div>

              <div class="kpi-card kpi-card--alert" id="kpi-alerta-precos">
                <div class="kpi-card__header">
                  <h3>Alerta: Preços Desatualizados</h3>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF9800" stroke-width="1.5">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                </div>
                <div class="kpi-card__value kpi-card__value--warning">3</div>
                <div class="kpi-card__label">Insumos precisam de atualização de preços</div>
              </div>
            </div>

            <!-- Atividade Recente -->
            <div class="card card--flat" style="margin-top: 20px;">
              <h2 class="section-title">Atividade Recente</h2>
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Projeto</th>
                    <th>Cliente</th>
                    <th>Valor</th>
                    <th>Margem</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let a of atividadeRecente">
                    <td>{{ a.projeto }}</td>
                    <td>{{ a.cliente }}</td>
                    <td>{{ a.valor }}</td>
                    <td class="margem-cell">{{ a.margem }}</td>
                    <td>
                      <span class="badge" [ngClass]="getBadgeClass(a.status)">{{ a.status }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- ── HISTÓRICO ──────────────────────────────────────── -->
          <div *ngIf="activeTab === 'historico'">
            <div class="card card--flat">
              <h2 class="section-title">Histórico de Orçamentos</h2>
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Nº Orçamento</th>
                    <th>Projeto</th>
                    <th>Cliente</th>
                    <th>Data</th>
                    <th>Valor</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let o of historico">
                    <td>{{ o.numero }}</td>
                    <td>{{ o.projeto }}</td>
                    <td>{{ o.cliente }}</td>
                    <td>{{ o.data }}</td>
                    <td>{{ o.valor }}</td>
                    <td>
                      <span class="badge" [ngClass]="getBadgeClass(o.status)">{{ o.status }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- ── BUSCA GLOBAL ───────────────────────────────────── -->
          <div *ngIf="activeTab === 'busca'">
            <div class="busca-section">
              <div class="ds-input-wrap" style="max-width: 480px;">
                <label>Buscar em todos os registros</label>
                <div class="ds-input">
                  <input
                    id="busca-global"
                    type="text"
                    [(ngModel)]="buscaTermo"
                    placeholder="Projeto, cliente, material..."
                  />
                  <button class="icon-btn" type="button" aria-label="Buscar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <circle cx="11" cy="11" r="8"/>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                  </button>
                </div>
              </div>

              <div class="busca-results" *ngIf="buscaTermo">
                <p class="busca-hint">Resultados para: <strong>{{ buscaTermo }}</strong></p>
                <div class="empty-state" style="margin-top: 20px;">
                  Funcionalidade de busca em desenvolvimento.
                </div>
              </div>

              <div class="busca-empty" *ngIf="!buscaTermo">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ABABAB" stroke-width="1">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <p>Use o campo acima para buscar projetos, clientes ou materiais</p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  `,
  styles: [`
    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }

    .section-title {
      font-family: 'Inter', sans-serif;
      font-size: 15px;
      font-weight: 500;
      margin-bottom: 16px;
    }

    .margem-cell {
      color: #79CAEE;
      font-weight: 500;
    }

    .busca-section {
      padding: 8px 0;
    }

    .busca-hint {
      margin-top: 16px;
      font-size: 14px;
      color: #929395;
    }

    .busca-empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      padding: 48px 0;
      color: #ABABAB;
      font-size: 14px;
    }

    .empty-state {
      text-align: center;
      color: #ABABAB;
      font-size: 14px;
      padding: 32px;
      border: 1px dashed #E8EAED;
      border-radius: 8px;
    }
  `]
})
export class RelatoriosComponent {

  constructor(private authService: AuthService, private router: Router, private http: HttpClient, private cdr: ChangeDetectorRef) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  // consultar o endpoint /orcamento/quantidade com autenticação por token JWT para recuperar a quantidade total de orçamentos ativos e exibir corretamente a informação para o usuário
  ngOnInit() {
    this.consultarQuantidadeOrcamentosAtivos();
    this.consultarMediaMargemLucro();
  }


  consultarQuantidadeOrcamentosAtivos() {
    this.http.get<number>(`${environment.apiUrl}/orcamento/quantidade`, { headers: { 'Authorization': `Bearer ${this.authService.getToken()}` } })
      .subscribe({
        next: (response) => {
          this.totalOrcamentos = response;
          this.cdr.markForCheck();
        },
        error: (error) => {
          console.error('Erro ao recuperar quantidade de orçamentos:', error);
        }
      });
  }

  consultarMediaMargemLucro() {
    this.http.get<number>(`${environment.apiUrl}/orcamento/margem_media_lucro`, { headers: { 'Authorization': `Bearer ${this.authService.getToken()}` } })
      .subscribe({
        next: (response) => {
          this.mediaMargemLucro = response;
          this.cdr.markForCheck();
        },
        error: (error) => {
          console.error('Erro ao recuperar quantidade de orçamentos:', error);
        }
      });
    }

  activeTab: 'dashboard' | 'historico' | 'busca' = 'dashboard';
  buscaTermo = '';
  totalOrcamentos = 2;
  mediaMargemLucro = 16.2;

  atividadeRecente: AtividadeRecente[] = [
    { projeto: 'Reforma do Escritório Central', cliente: 'Anderson Construction LLC', valor: '$125.000', margem: '18%', status: 'Aprovado' },
    { projeto: 'Complexo Residencial - Fase 2', cliente: 'Mitchell Builders Inc', valor: '$450.000', margem: '15%', status: 'Pendente' },
    { projeto: 'Expansão do Armazém', cliente: 'Chen Realty Group', valor: '$280.000', margem: '20%', status: 'Aprovado' },
    { projeto: 'Reforma do Refeitório Escolar', cliente: 'Anderson Construction LLC', valor: '$95.000', margem: '12%', status: 'Concluído' },
    { projeto: 'Construção de Loja de Varejo', cliente: 'Chen Realty Group', valor: '$180.000', margem: '18%', status: 'Concluído' },
  ];

  historico: OrcamentoHistorico[] = [
    { numero: '#ORC-001', projeto: 'Reforma do Escritório Central', cliente: 'Anderson Construction LLC', data: '15/03/2026', valor: 'R$125.000', status: 'Aprovado' },
    { numero: '#ORC-002', projeto: 'Complexo Residencial - Fase 2', cliente: 'Mitchell Builders Inc', data: '05/01/2026', valor: 'R$450.000', status: 'Pendente' },
    { numero: '#ORC-003', projeto: 'Expansão do Armazém', cliente: 'Chen Realty Group', data: '20/02/2026', valor: 'R$280.000', status: 'Aprovado' },
    { numero: '#ORC-004', projeto: 'Reforma do Refeitório Escolar', cliente: 'Anderson Construction LLC', data: '10/01/2026', valor: 'R$95.000', status: 'Concluído' },
    { numero: '#ORC-005', projeto: 'Construção de Loja de Varejo', cliente: 'Chen Realty Group', data: '28/11/2025', valor: 'R$180.000', status: 'Concluído' },
  ];

  getBadgeClass(status: string): string {
    const map: Record<string, string> = {
      'Aprovado': 'badge--aprovado',
      'Pendente': 'badge--pendente',
      'Concluído': 'badge--concluido'
    };
    return map[status] || '';
  }
}
