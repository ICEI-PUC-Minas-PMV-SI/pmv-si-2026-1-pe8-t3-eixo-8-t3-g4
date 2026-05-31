import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'esqueci-senha',
    loadComponent: () => import('./features/auth/esqueci-senha/esqueci-senha.component').then(m => m.EsqueciSenhaComponent)
  },
  {
    path: 'criar-conta',
    loadComponent: () => import('./features/auth/criar-conta/criar-conta.component').then(m => m.CriarContaComponent)
  },
  {
    path: 'cadastros',
    loadComponent: () => import('./features/cadastros/cadastros.component').then(m => m.CadastrosComponent)
  },
  {
    path: 'orcamentos',
    loadComponent: () => import('./features/orcamentos/orcamentos.component').then(m => m.OrcamentosComponent)
  },
  {
    path: 'relatorios',
    loadComponent: () => import('./features/relatorios/relatorios.component').then(m => m.RelatoriosComponent)
  },
  { path: '**', redirectTo: 'login' }
];
