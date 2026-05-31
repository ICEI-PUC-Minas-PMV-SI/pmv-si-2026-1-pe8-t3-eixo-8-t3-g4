import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';

interface Projeto {
  id_projeto: number;
  id_cliente: number;
  nome: string;
  orcamento: string;
  dataInicio: string;
}

interface DetalhamentoProjeto {
  projeto: Projeto;
  cliente: { id: number; nome: string };
}

interface NovoProjeto {
  nome: string;
  id_cliente: number;
  cliente: { id: number; nome: string };
  orcamento: string;
  dataInicio: string;
}

interface SalvarEdicaoProjeto {
  id_projeto: number;
  nome: string;
  id_cliente: number;
  orcamento: string;
  dataInicio: string;
}

interface OpcoesEdicaoProjeto {
  id_projeto?: number;
  nome: string;
  cliente: { id: number; nome: string };
  orcamento: string;
  dataInicio: string;
}

interface Cliente {
  id: number;
  nome: string;
  email: string;
  telefone: string;
}

interface NovoCliente {
  nome: string;
  email: string;
  telefone: string;
}

interface Produto {
  id: number;
  nome: string;
  unidade: string;
  precoAtual: string;
}

interface NovoProduto {
  nome: string;
  unidade: string;
  precoAtual: string;
}

@Component({
  selector: 'app-cadastros',
  standalone: true,
  imports: [CommonModule, SidebarComponent, FormsModule],
  template: `
    <div class="app-shell">
      <app-sidebar />
      <main class="app-content">

        <div class="page-header">
          <h1>Cadastros</h1>
        </div>

        <!-- Tabs -->
        <div class="tabs">
          <button
            class="tabs__item"
            [class.active]="activeTab === 'produtos'"
            (click)="activeTab = 'produtos'"
            id="tab-produtos">
            Produtos e Preços
          </button>
          <button
            class="tabs__item"
            [class.active]="activeTab === 'clientes'"
            (click)="activeTab = 'clientes'"
            id="tab-clientes">
            Clientes
          </button>
          <button
            class="tabs__item"
            [class.active]="activeTab === 'projetos'"
            (click)="activeTab = 'projetos'"
            id="tab-projetos">
            Projetos
          </button>
        </div>

        <div class="tab-content">

          <!-- PROJETOS -->
          <div *ngIf="activeTab === 'projetos'" class="content-area">
            <div class="card card--flat">
              <div class="table-header">
                <h2>Projetos</h2>
                <button class="btn btn--primary btn--sm" id="btn-adicionar-projeto" (click)="openCriarProjeto()">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  Adicionar Projeto
                </button>
              </div>

              <table class="data-table">
                <thead>
                  <tr>
                    <th>Nome do Projeto</th>
                    <th>Cliente</th>
                    <th>Orçamento</th>
                    <th>Data de Início</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let p of detalhamentoprojetos">
                    <td>{{ p.projeto.nome }}</td>
                    <td>{{ p.cliente.nome }}</td>
                    <td>{{ p.projeto.orcamento }}</td>
                    <td>{{ p.projeto.dataInicio }}</td>
                    <td>
                      <div class="actions-group">
                        <button class="action-icon" title="Editar" [id]="'edit-projeto-' + p.projeto.id_projeto" (click)="openEditProjeto(p.projeto)">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                          </svg>
                        </button>
                        <button class="action-icon action-icon--danger" title="Excluir" [id]="'delete-projeto-' + p.projeto.id_projeto" (click)="deleteProjeto(p.projeto)">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                            <path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- CLIENTES -->
          <div *ngIf="activeTab === 'clientes'" class="content-area">
            <div class="card card--flat">
              <div class="table-header">
                <h2>Clientes</h2>
                <button class="btn btn--primary btn--sm" id="btn-adicionar-cliente" (click)="openCriarCliente()">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  Adicionar Cliente
                </button>
              </div>

              <table class="data-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let c of clientes">
                    <td>{{ c.nome }}</td>
                    <td>{{ c.email }}</td>
                    <td>{{ c.telefone }}</td>
                    <td>
                      <div class="actions-group">
                        <button class="action-icon" [id]="'edit-cliente-' + c.id" (click)="openEditCliente(c)">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                          </svg>
                        </button>
                        <button class="action-icon action-icon--danger" [id]="'delete-cliente-' + c.id" (click)="deleteCliente(c)">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                            <path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- PRODUTOS E PRECOS -->
          <div *ngIf="activeTab === 'produtos'" class="content-area">
            <div class="card card--flat">
              <div class="table-header">
                <h2>Produtos e Preços</h2>
                <button class="btn btn--primary btn--sm" id="btn-adicionar-produto" (click)="openCriarProduto()">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  Adicionar Produto
                </button>
              </div>

              <table class="data-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Unidade</th>
                    <th>Preço Unitário</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let prod of produtos">
                    <td>{{ prod.nome }}</td>
                    <td>{{ prod.unidade }}</td>
                    <td>{{ "R$ " + formatarCasasDecimais(prod.precoAtual) }}</td>
                    <td>
                      <div class="actions-group">
                        <button class="action-icon" [id]="'edit-produto-' + prod.id" (click)="openEditProduto(prod)">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                          </svg>
                        </button>
                        <button class="action-icon action-icon--danger" [id]="'delete-produto-' + prod.id" (click)="deleteProduto(prod)">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                            <path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>


        <!-- MODAL ADICIONAR CLIENTE -->
        <div class="modal-overlay" *ngIf="showNewClienteModal" (click)="closeNewClienteModal()">
          <div class="modal-box" (click)="$event.stopPropagation()">
            <div class="modal-header">
              <h3>Adicionar Cliente</h3>
              <button class="close-modal" (click)="closeNewClienteModal()" aria-label="Fechar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div class="modal-body" *ngIf="newCliente">
              <div class="form-field">
                <label for="ec-nome">Nome</label>
                <input id="ec-nome" type="text" [(ngModel)]="newCliente.nome" class="form-input" />
              </div>
              <div class="form-field">
                <label for="ec-email">E-mail</label>
                <input id="ec-email" type="email" [(ngModel)]="newCliente.email" class="form-input" />
              </div>
              <div class="form-field">
                <label for="ec-telefone">Telefone</label>
                <input id="ec-telefone" type="text" [(ngModel)]="newCliente.telefone" class="form-input" />
              </div>
              <div class="form-field">
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn--secondary" style="width: auto; padding: 0 24px;" (click)="closeNewClienteModal()">Cancelar</button>
              <button class="btn btn--primary" style="width: auto; padding: 0 24px;" (click)="saveNewCliente(newCliente)">Salvar</button>
            </div>
          </div>
        </div>

        <!-- MODAL ADICIONAR PRODUTO -->
        <div class="modal-overlay" *ngIf="showNewProdutoModal" (click)="closeNewProdutoModal()">
          <div class="modal-box" (click)="$event.stopPropagation()">
            <div class="modal-header">
              <h3>Adicionar Produto</h3>
              <button class="close-modal" (click)="closeNewProdutoModal()" aria-label="Fechar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div class="modal-body" *ngIf="newProduto">
              <div class="form-field">
                <label for="ep-nome">Nome</label>
                <input id="ep-nome" type="text" [(ngModel)]="newProduto.nome" class="form-input" />
              </div>
              <div class="form-field">
                <label for="ep-descricao">Unidade</label>
                <input id="ep-descricao" type="text" [(ngModel)]="newProduto.unidade" class="form-input" />
              </div>
              <div class="form-field">
                <label for="ep-preco">Preço</label>
                <input id="ep-preco" type="number" [(ngModel)]="newProduto.precoAtual" class="form-input" />
              </div>
              <div class="form-field">
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn--secondary" style="width: auto; padding: 0 24px;" (click)="closeNewProdutoModal()">Cancelar</button>
              <button class="btn btn--primary" style="width: auto; padding: 0 24px;" (click)="saveNewProduto(newProduto)">Salvar</button>
            </div>
          </div>
        </div>


        <!-- MODAL ADICIONAR PROJETO -->
         <div class="modal-overlay" *ngIf="showNewProjetoModal" (click)="closeNewProjetoModal()">
          <div class="modal-box" (click)="$event.stopPropagation()">
            <div class="modal-header">
              <h3>Adicionar Projeto</h3>
              <button class="close-modal" (click)="closeNewProjetoModal()" aria-label="Fechar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div class="modal-body" *ngIf="newProjeto">
              <div class="form-field">
                <label for="ep-nome">Nome</label>
                <input id="ep-nome" type="text" [(ngModel)]="newProjeto.nome" class="form-input" />
              </div>
              <label for="cliente-projeto">Cliente</label>
                  <select id="cliente-projeto" [(ngModel)]="newProjeto.cliente.id" class="form-input form-select">
                    <option *ngFor="let cliente of clientesArray" [value]="cliente.id">
                      {{ cliente.nome }}
                    </option>
                  </select>
              <div class="form-field">
                <label for="ep-descricao">Orçamento</label>
                <input id="ep-descricao" type="text" [(ngModel)]="newProjeto.orcamento" class="form-input" />
              </div>
              <div class="form-field">
                <label for="ep-preco">Data de início</label>
                <input id="ep-preco" type="number" [(ngModel)]="newProjeto.dataInicio" class="form-input" />
              </div>
              <div class="form-field">
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn--secondary" style="width: auto; padding: 0 24px;" (click)="closeNewProjetoModal()">Cancelar</button>
              <button class="btn btn--primary" style="width: auto; padding: 0 24px;" (click)="saveNewProjeto(newProjeto)">Salvar</button>
            </div>
          </div>
        </div>







        <!-- Modal Adicionar (generico) -->
        <div class="modal-overlay" *ngIf="showModal" (click)="closeModal()">
          <div class="modal-box" (click)="$event.stopPropagation()">
            <div class="modal-header">
              <h3>Adicionar {{ modalTitle }}</h3>
              <button class="close-modal" (click)="closeModal()" aria-label="Fechar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div class="modal-body">
              <p class="modal-hint">Formulário de {{ modalTitle }} (funcionalidade em desenvolvimento).</p>
            </div>
            <div class="modal-footer">
              <button class="btn btn--secondary" style="width: auto; padding: 0 24px;" (click)="closeModal()">Cancelar</button>
              <button class="btn btn--primary" style="width: auto; padding: 0 24px;">Salvar</button>
            </div>
          </div>
        </div>





        <!-- MODAL EDITAR CLIENTE -->
        <div class="modal-overlay" *ngIf="showEditClienteModal" (click)="closeEditCliente()">
          <div class="modal-box" (click)="$event.stopPropagation()">
            <div class="modal-header">
              <h3>Editar Cliente</h3>
              <button class="close-modal" (click)="closeEditCliente()" aria-label="Fechar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div class="modal-body" *ngIf="editingCliente">
              <div class="form-field">
                <label for="ec-nome">Nome</label>
                <input id="ec-nome" type="text" [(ngModel)]="editingCliente.nome" class="form-input" />
              </div>
              <div class="form-field">
                <label for="ec-email">E-mail</label>
                <input id="ec-email" type="email" [(ngModel)]="editingCliente.email" class="form-input" />
              </div>
              <div class="form-field">
                <label for="ec-telefone">Telefone</label>
                <input id="ec-telefone" type="text" [(ngModel)]="editingCliente.telefone" class="form-input" />
              </div>
              <div class="form-field">
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn--secondary" style="width: auto; padding: 0 24px;" (click)="closeEditCliente()">Cancelar</button>
              <button class="btn btn--primary" style="width: auto; padding: 0 24px;" (click)="saveEditCliente()">Salvar Alterações</button>
            </div>
          </div>
        </div>

        <!-- MODAL EDITAR PRODUTO -->
        <div class="modal-overlay" *ngIf="showEditProdutoModal" (click)="closeEditProduto()">
          <div class="modal-box" (click)="$event.stopPropagation()">
            <div class="modal-header">
              <h3>Editar Produto</h3>
              <button class="close-modal" (click)="closeEditProduto()" aria-label="Fechar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div class="modal-body" *ngIf="editingProduto">
              <div class="form-field">
                <label for="ep-nome">Nome</label>
                <input id="ep-nome" type="text" [(ngModel)]="editingProduto.nome" class="form-input" />
              </div>
              <div class="form-field">
                <label for="ep-descricao">Unidade</label>
                <input id="ep-descricao" type="text" [(ngModel)]="editingProduto.unidade" class="form-input" />
              </div>
              <div class="form-field">
                <label for="ep-preco">Preço (R$)</label>
                <input id="ep-preco" type="text" [(ngModel)]="editingProduto.precoAtual" class="form-input" />
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn--secondary" style="width: auto; padding: 0 24px;" (click)="closeEditProduto()">Cancelar</button>
              <button class="btn btn--primary" style="width: auto; padding: 0 24px;" (click)="saveEditProduto()">Salvar Alterações</button>
            </div>
          </div>
        </div>

        <!-- MODAL EDITAR PROJETO -->
        <div class="modal-overlay" *ngIf="showEditProjetoModal" (click)="closeEditProjeto()">
          <div class="modal-box modal-box--wide" (click)="$event.stopPropagation()">
            <div class="modal-header">
              <h3>Editar Projeto</h3>
              <button class="close-modal" (click)="closeEditProjeto()" aria-label="Fechar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div class="modal-body" *ngIf="editingProjeto">
              <div class="form-field">
                <label for="ep-nome">Nome do Projeto</label>
                <input id="ep-nome" type="text" [(ngModel)]="editingProjeto.nome" class="form-input" />
              </div>
               <div class="form-row">
                <div class="form-field">
                  <label for="cliente-projeto">Cliente</label>
                  <select id="cliente-projeto" [(ngModel)]="editingProjeto.cliente.id" class="form-input form-select">
                    <option *ngFor="let cliente of clientesArray" [value]="cliente.id">
                      {{ cliente.nome }}
                    </option>
                  </select>
                </div>
                <div class="form-field">
                  <label for="ep-orcamento">Orçamento (R$)</label>
                  <input id="ep-orcamento" type="text" [(ngModel)]="editingProjeto.orcamento" class="form-input" />
                </div>
              </div>
              <div class="form-field">
                <label for="ep-data">Data de Início</label>
                <input id="ep-data" type="text" [(ngModel)]="editingProjeto.dataInicio" class="form-input" />
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn--secondary" style="width: auto; padding: 0 24px;" (click)="closeEditProjeto()">Cancelar</button>
              <button class="btn btn--primary" style="width: auto; padding: 0 24px;" (click)="saveEditProjeto()">Salvar Alterações</button>
            </div>
          </div>
        </div>

      </main>
    </div>
  `,
  styles: [`
    .content-area {
      padding: 0 24px 24px;
    }

    .table-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      h2 {
        font-family: 'Inter', sans-serif;
        font-size: 16px;
        font-weight: 500;
      }
    }

    .acesso-cell {
      display: flex;
      gap: 4px;
      flex-wrap: wrap;
    }

    .actions-group {
      display: flex;
      gap: 4px;
    }

    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.35);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal-box {
      background: #fff;
      border-radius: 12px;
      width: 520px;
      max-width: 95vw;
      box-shadow: 0 8px 32px rgba(0,0,0,0.18);
      max-height: 90vh;
      overflow-y: auto;
    }

    .modal-box--wide {
      width: 560px;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24px 28px 20px;
      border-bottom: 1px solid #E8EAED;

      h3 {
        font-family: 'Inter', sans-serif;
        font-size: 20px;
        font-weight: 700;
        color: #15161C;
      }
    }

    .close-modal {
      background: none;
      border: none;
      cursor: pointer;
      color: #929395;
      display: flex;
      align-items: center;
    }
    .close-modal:hover { color: #15161C; }

    .modal-body {
      padding: 24px 28px;
      display: flex;
      flex-direction: column;
      gap: 18px;
    }

    .modal-hint {
      color: #929395;
      font-size: 14px;
    }

    .modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      padding: 16px 28px;
      border-top: 1px solid #E8EAED;
    }

    .form-field {
      display: flex;
      flex-direction: column;
      gap: 6px;

      label {
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        font-weight: 500;
        color: #15161C;
      }
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .form-input {
      border: 1px solid #D1D5DB;
      border-radius: 8px;
      padding: 10px 14px;
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      color: #15161C;
      outline: none;
      width: 100%;
      box-sizing: border-box;
      background: #fff;
      transition: border-color 0.15s;
    }
    .form-input:focus {
      border-color: #79CAEE;
      box-shadow: 0 0 0 3px rgba(121, 202, 238, 0.15);
    }

    .form-select {
      cursor: pointer;
    }

    .toggle-group {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 2px;
    }

    .toggle-btn {
      padding: 8px 18px;
      border-radius: 8px;
      border: 1.5px solid #D1D5DB;
      background: #fff;
      font-family: 'Inter', sans-serif;
      font-size: 13px;
      font-weight: 500;
      color: #929395;
      cursor: pointer;
      transition: all 0.15s;
    }
    .toggle-btn.active {
      background: #79CAEE;
      border-color: #79CAEE;
      color: #041825;
      font-weight: 600;
    }
    .toggle-btn:hover:not(.active) {
      border-color: #79CAEE;
      color: #15161C;
    }
  `]
})

export class CadastrosComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private http: HttpClient, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
    this.recuperarDadosClientes();
    this.recuperarDadosProdutos();
    this.recuperarDadosProjetos();
  }

  // AUX

  formatarCasasDecimais(valor: string) {
    return parseFloat(valor).toFixed(2).replace('.', ',');
  }


  private resposta: any;

  //INTEGRAÇÂO COM A API - CLIENTES

  recuperarDadosClientes() {
    this.http.get(`${environment.apiUrl}/cliente`, { headers: { 'Authorization': `Bearer ${this.authService.getToken()}` } })
      .subscribe({
        next: (response) => {
          console.log('Resposta:', response);
          this.resposta = response as any;
          if (this.resposta && this.resposta.content) {
            this.clientes = this.resposta.content;
            // console.log('Clientes atualizados:', this.clientes);
            this.cdr.detectChanges();
          }
        },
        error: (error) => {
          console.error('Erro:', error);
        }
      });
  }

  persistirAtualizacaoCliente() {
    this.http.put(`${environment.apiUrl}/cliente`, this.editingCliente, { headers: { 'Authorization': `Bearer ${this.authService.getToken()}` } })
      .subscribe({
        next: (response) => {
          console.log('Cliente atualizado com sucesso:', response);
          this.recuperarDadosClientes();
        },
        error: (error) => {
          console.error('Erro ao atualizar cliente:', error);
        }
      });
  }

  persistirClienteDeletado(clienteId: number) {
    this.http.delete(`${environment.apiUrl}/cliente`, { headers: { 'Authorization': `Bearer ${this.authService.getToken()}` }, body: { 'id': clienteId } })
      .subscribe({
        next: (response) => {
          console.log('Cliente deletado com sucesso:', response);
          this.recuperarDadosClientes();
        },
        error: (error) => {
          console.error('Erro ao deletar cliente:', error);
        }
      });
  }

  persistirNovoCliente(NovoCliente: NovoCliente) {
    const jsonBody = JSON.stringify(NovoCliente);
    console.log('Enviando novo cliente para o backend:', jsonBody);
    console.log('novo cliente:', NovoCliente);
    this.http.post(`${environment.apiUrl}/cliente`, NovoCliente, { headers: { 'Authorization': `Bearer ${this.authService.getToken()}` } })
      .subscribe({
        next: (response) => {
          console.log('Cliente criado com sucesso:', response);
          this.recuperarDadosClientes();
        },
        error: (error) => {
          console.error('Erro ao criar cliente:', error);
        }
      });
  }


  //INTEGRAÇÃO COM A API - PRODUTOS

  recuperarDadosProdutos() {
    // O interceptor vai adicionar o token automaticamente
    this.http.get(`${environment.apiUrl}/insumo`, { headers: { 'Authorization': `Bearer ${this.authService.getToken()}` } })
      .subscribe({
        next: (response) => {
          console.log('Resposta:', response);
          this.resposta = response as any;
          if (this.resposta && this.resposta.content) {
            this.produtos = this.resposta.content;
            console.log('Insumos atualizados:', this.produtos);
            this.cdr.detectChanges();
          }
        },
        error: (error) => {
          console.error('Erro:', error);
        }
      });
  }

  persistirAtualizacaoProduto() {
    this.http.put(`${environment.apiUrl}/insumo`, this.editingProduto, { headers: { 'Authorization': `Bearer ${this.authService.getToken()}` } })
      .subscribe({
        next: (response) => {
          console.log('Insumo atualizado com sucesso:', response);
          this.recuperarDadosProdutos(); // Recarrega os insumos para refletir a atualização
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Erro ao atualizar insumo:', error);
        }
      });
  }

  persistirProdutoDeletado(produtoId: number) {
    this.http.delete(`${environment.apiUrl}/insumo`, { headers: { 'Authorization': `Bearer ${this.authService.getToken()}` }, body: { 'id': produtoId } })
      .subscribe({
        next: (response) => {
          console.log('Insumo deletado com sucesso:', response);
          this.recuperarDadosProdutos(); // Recarrega os insumos para refletir a exclusão
        },
        error: (error) => {
          console.error('Erro ao deletar insumo:', error);
        }
      });
  }

  persistirNovoProduto(NovoProduto: NovoProduto) {
    const jsonBody = JSON.stringify(NovoProduto);
    console.log('Enviando novo insumo para o backend:', jsonBody);
    console.log('novo insumo:', NovoProduto);
    this.http.post(`${environment.apiUrl}/insumo`, NovoProduto, { headers: { 'Authorization': `Bearer ${this.authService.getToken()}` } })
      .subscribe({
        next: (response) => {
          console.log('Insumo criado com sucesso:', response);
          this.recuperarDadosProdutos();
        },
        error: (error) => {
          console.error('Erro ao criar insumo:', error);
        }
      });
  }




  // INTEGRAÇÃO COM A API - PROJETOS

  recuperarDadosProjetos() {
    this.http.get(`${environment.apiUrl}/projeto`, { headers: { 'Authorization': `Bearer ${this.authService.getToken()}` } })
      .subscribe({
        next: (response) => {
          console.log('Resposta:', response);
          this.resposta = response as any;
          if (this.resposta && this.resposta.content) {
            this.projetos = this.resposta.content;
            console.log('Projetos recuperados:', this.projetos);

            // para cada projeto recuperado da base de dados, inicializar um 'detalhamentoProjeto' com os dados do projeto e cliente vazio
            this.detalhamentoprojetos = this.projetos.map((projeto: Projeto) => ({
              projeto: projeto,
              cliente: { id: projeto.id_cliente, nome: '' }
            }));


            // para cada projeto, recuperar o cliente associado
            this.detalhamentoprojetos.forEach((projeto: DetalhamentoProjeto) => {
              const id = projeto.projeto.id_projeto;
              const id_cliente = this.projetos.find(p => p.id_projeto === id)?.id_cliente;
              if (id_cliente) {
                this.http.get(`${environment.apiUrl}/cliente/${id_cliente}`, { headers: { 'Authorization': `Bearer ${this.authService.getToken()}` } })
                  .subscribe({
                    next: (clienteResponse) => {
                      const clienteData = clienteResponse as any;
                      projeto.cliente = { id: clienteData.id, nome: clienteData.nome }; // Atualiza o cliente do projeto com os dados completos
                      console.log(`Cliente atualizado para projeto ${projeto.projeto.id_projeto}:`, projeto);
                      this.cdr.detectChanges(); // Atualiza a view para refletir a mudança
                    },
                    error: (error) => {
                      console.error(`Erro ao recuperar cliente para projeto ${projeto.projeto.id_projeto}:`, error);
                    }
                  });
              } else {
                console.warn(`Cliente não encontrado para projeto ${projeto.projeto.id_projeto}`);
              }
            });
            console.log('Projetos atualizados:', this.detalhamentoprojetos);
            this.cdr.detectChanges();
          }
        },
        error: (error) => {
          console.error('Erro:', error);
        }
      });
  }

  persistirProjetoDeletado(projetoId: number) {
    this.http.delete(`${environment.apiUrl}/projeto`, { headers: { 'Authorization': `Bearer ${this.authService.getToken()}` }, body: { 'id_projeto': projetoId } })
      .subscribe({
        next: (response) => {
          console.log('Projeto deletado com sucesso:', response);
          this.recuperarDadosProjetos(); // Recarrega os projetos para refletir a exclusão
        },
        error: (error) => {
          console.error('Erro ao deletar projeto:', error);
        }
      });
  }

  persistirAtualizacaoProjeto() {

    const payload = {
      id_projeto: this.editingProjeto?.id_projeto,
      nome: this.editingProjeto?.nome,
      id_cliente: this.editingProjeto?.cliente.id,
      orcamento: this.editingProjeto?.orcamento,
      dataInicio: this.editingProjeto?.dataInicio
    };

    if (this.editingProjeto !== null) {
      payload.id_cliente = Number(this.editingProjeto.cliente.id);
    }

    console.log('Payload para atualização do projeto:', payload);
    this.http.put(`${environment.apiUrl}/projeto`, payload, { headers: { 'Authorization': `Bearer ${this.authService.getToken()}` } })
      .subscribe({
        next: (response) => {
          console.log('Projeto atualizado com sucesso:', response);
          this.recuperarDadosProjetos(); // Recarrega os projetos para refletir a atualização
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Erro ao atualizar projeto:', error);
        }
      });
  }



  persistirNovoProjeto(NovoProjeto: NovoProjeto) {

    const payload = {
      nome: NovoProjeto.nome,
      id_cliente: NovoProjeto.cliente.id,
      orcamento: NovoProjeto.orcamento,
      dataInicio: NovoProjeto.dataInicio
    };

    console.log('Payload para criação do projeto:', payload);
    this.http.post(`${environment.apiUrl}/projeto`, payload, { headers: { 'Authorization': `Bearer ${this.authService.getToken()}` } })
      .subscribe({
        next: (response) => {
          console.log('Projeto criado com sucesso:', response);
          this.recuperarDadosProjetos(); // Recarrega os projetos para refletir a criação
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Erro ao criar projeto:', error);
        }
      });
  }





  activeTab: 'projetos' | 'clientes' | 'produtos' = 'projetos';
  showModal = false;
  modalTitle = '';

  showEditClienteModal = false;
  editingCliente: Cliente | null = null;

  showNewClienteModal = false;
  newCliente: NovoCliente = { nome: '', email: '', telefone: '' };

  showNewProdutoModal = false;
  newProduto: NovoProduto = { nome: '', unidade: '', precoAtual: '' };

  showEditProdutoModal = false;
  editingProduto: Produto | null = null;


  showNewProjetoModal = false;
  newProjeto: NovoProjeto = { nome: '', id_cliente: 0, orcamento: '', dataInicio: '' , cliente: { id: 0, nome: '' } };


  showEditProjetoModal = false;
  editingProjeto: OpcoesEdicaoProjeto | null = null;
  rolesDisponiveis = ['gestor', 'orcamentista'];

  detalhamentoprojetos: DetalhamentoProjeto[] = [
    /*{ projeto: { id_projeto: 1, id_cliente: 1, nome: 'Reforma do Escritório Central', orcamento: 'R$525.000', dataInicio: '15-03-2026' }, cliente: { id: 1, nome: 'Anderson Construction LLC' } },
    { projeto: { id_projeto: 2, id_cliente: 1, nome: 'Complexo Residencial - Fase 2', orcamento: 'R$950.000', dataInicio: '05-01-2026' }, cliente: { id: 1, nome: 'Anderson Construction LLC' } },
    { projeto: { id_projeto: 3, id_cliente: 1, nome: 'Expansão do Armazém', orcamento: 'R$580.000', dataInicio: '20-02-2026' }, cliente: { id: 1, nome: 'Anderson Construction LLC' } },*/
  ];

  projetos: Projeto[] = [
    /*{ id_projeto: 1, nome: 'Reforma do Escritório Central', id_cliente: 1, orcamento: 'R$525.000', dataInicio: '15-03-2026' },
    { id_projeto: 2, nome: 'Complexo Residencial - Fase 2', id_cliente: 1, orcamento: 'R$950.000', dataInicio: '05-01-2026' },
    { id_projeto: 3, nome: 'Expansão do Armazém', id_cliente: 1, orcamento: 'R$580.000', dataInicio: '20-02-2026' },*/
  ];

  clientes: Cliente[] = [
    /*{ id: 1, nome: 'Anderson Williams', empresa: 'Anderson Construction LLC', email: 'anderson@acc.com', telefone: '(11) 98765-4321'},
    { id: 2, nome: 'Mitchell Brown', empresa: 'Mitchell Builders Inc', email: 'mitchell@mbi.com', telefone: '(21) 97654-3210'},
    { id: 3, nome: 'Chen Li', empresa: 'Chen Realty Group', email: 'chen@crg.com', telefone: '(31) 96543-2109'},*/
  ];

  produtos: Produto[] = [
    /*{ id: 1, nome: 'Vergalhão de Aço (#4, 20ft)', unidade: 'unidade', precoAtual: 'R$18,75' },
    { id: 2, nome: 'Cimento Portland (saco de 50kg)', unidade: 'saco', precoAtual: 'R$12,50' },
    { id: 3, nome: 'Bloco Cerâmico 14x19x29', unidade: 'm²', precoAtual: 'R$4,20' },
    { id: 4, nome: 'Tinta Acrílica Semibrilho 18L', unidade: 'lata', precoAtual: 'R$189,00' },*/
  ];

  getBadgeClass(status: string): string {
    const map: Record<string, string> = {
      'Ativo': 'badge--ativo',
      'Planejamento': 'badge--planejamento',
      'Concluído': 'badge--concluido'
    };
    return map[status] || '';
  }

  openModal(type: string) {
    this.modalTitle = type === 'projeto' ? 'Projeto' : type === 'cliente' ? 'Cliente' : 'Produto';
    this.showModal = true;
  }

  openCriarCliente() {
    this.newCliente = { nome: '', email: '', telefone: '' };
    this.showNewClienteModal = true;
  }

  closeNewClienteModal() {
    this.showNewClienteModal = false;
  }

  closeModal() {
    this.showModal = false;
  }

  openEditCliente(c: Cliente) {
    this.editingCliente = { ...c };
    this.showEditClienteModal = true;
  }

  deleteCliente(c: Cliente) {
    if (confirm(`Tem certeza que deseja excluir o cliente "${c.nome}"?`)) {
      this.clientes = this.clientes.filter(cliente => cliente.id !== c.id);
      this.persistirClienteDeletado(c.id); // Envia a exclusão para o backend
    }
  }

  closeEditCliente() {
    this.showEditClienteModal = false;
    this.editingCliente = null;
  }


  saveEditCliente() {
    if (!this.editingCliente) return;
    const idx = this.clientes.findIndex(c => c.id === this.editingCliente!.id);
    if (idx >= 0) {
      this.clientes[idx] = { ...this.editingCliente };
    }
    this.persistirAtualizacaoCliente(); // Envia a atualização para o backend
    this.closeEditCliente();
  }

  saveNewCliente(newCliente: NovoCliente) {
    this.persistirNovoCliente(newCliente);
    this.closeNewClienteModal();
  }





  saveNewProduto(newProduto: NovoProduto) {
    this.persistirNovoProduto(newProduto);
    this.closeNewProdutoModal();
  }

  closeNewProdutoModal() {
    this.showNewProdutoModal = false;
  }

  openCriarProduto() {
    this.newProduto = { nome: '', unidade: '', precoAtual: '' };
    this.showNewProdutoModal = true;
  }

  openEditProduto(p: Produto) {
    this.editingProduto = { ...p };
    this.showEditProdutoModal = true;
  }

  closeEditProduto() {
    this.showEditProdutoModal = false;
    this.editingProduto = null;
  }

  saveEditProduto() {
    if (!this.editingProduto) return;
    const idx = this.produtos.findIndex(p => p.id === this.editingProduto!.id);
    if (idx >= 0) {
      this.produtos[idx] = { ...this.editingProduto };
    }
    this.persistirAtualizacaoProduto(); // Envia a atualização para o backend
    this.closeEditProduto();
  }

  deleteProduto(p: Produto) {
    if (confirm(`Tem certeza que deseja excluir o produto "${p.nome}"?`)) {
      this.persistirProdutoDeletado(p.id); // Envia a exclusão para o backend
      this.produtos = this.produtos.filter(produto => produto.id !== p.id);
    }
  }





  listarClientes() {
    const clienteMap = new Map<number, string>();
    this.clientes.forEach(cliente => {
      clienteMap.set(cliente.id, cliente.nome);
    });
    return clienteMap;
  }

  get clientesArray() {
    return Array.from(this.listarClientes().entries()).map(([id, nome]) => ({
      id,
      nome
    }));
  }









  openCriarProjeto() {
    this.newProjeto = { nome: '', dataInicio: '', orcamento: '', id_cliente: 0, cliente: { id: 0, nome: '' } };
    this.showNewProjetoModal = true;
  }

  saveNewProjeto(newProjeto: NovoProjeto) {
    this.persistirNovoProjeto(newProjeto);
    this.closeNewProjetoModal();
  }

  closeNewProjetoModal() {
    this.showNewProjetoModal = false;
  }

  openEditProjeto(p: Projeto) {

    const proj: OpcoesEdicaoProjeto = { id_projeto: p.id_projeto, nome: p.nome, dataInicio: p.dataInicio, orcamento: p.orcamento, cliente: { id: p.id_cliente, nome: '' } };
    this.editingProjeto = { ...proj };
    this.showEditProjetoModal = true;
  }

  closeEditProjeto() {
    this.showEditProjetoModal = false;
    this.editingProjeto = null;
  }

  saveEditProjeto() {
    if (!this.editingProjeto) return;
    const salvar: SalvarEdicaoProjeto = {
      id_projeto: this.projetos.find(p => p.nome === this.editingProjeto!.nome)?.id_projeto || 0,
      nome: this.editingProjeto.nome,
      dataInicio: this.editingProjeto.dataInicio,
      orcamento: this.editingProjeto.orcamento,
      id_cliente: this.editingProjeto.cliente.id
    };
    this.persistirAtualizacaoProjeto(); // Envia a atualização para o backend
    this.closeEditProjeto();
  }


  deleteProjeto(p: Projeto) {
    if (confirm(`Tem certeza que deseja excluir o projeto "${p.nome}"?`)) {
      this.persistirProjetoDeletado(p.id_projeto); // Envia a exclusão para o backend
      //this.produtos = this.produtos.filter(produto => produto.id !== p.id);
    }
  }

}
