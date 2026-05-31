import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <aside class="sidebar">
      <div class="sidebar__logo">
        <img src="logo-lad.png" alt="LAD Engenharia" class="sidebar__logo-img" />
      </div>

      <nav class="sidebar__nav">
        <a
          routerLink="/cadastros"
          routerLinkActive="active"
          class="sidebar__item">
          <svg class="sidebar__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
            <rect x="9" y="3" width="6" height="4" rx="1"/>
            <path d="M9 12h6M9 16h4"/>
          </svg>
          <span>Cadastros</span>
        </a>

        <a
          routerLink="/orcamentos"
          routerLinkActive="active"
          class="sidebar__item">
          <svg class="sidebar__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="3" y="3" width="7" height="7" rx="1"/>
            <rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="3" y="14" width="7" height="7" rx="1"/>
            <path d="M14 14h7M14 17.5h7M14 21h7"/>
          </svg>
          <span>Orçamentos</span>
        </a>

        <a
          routerLink="/relatorios"
          routerLinkActive="active"
          class="sidebar__item">
          <svg class="sidebar__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M3 3v18h18"/>
            <path d="M7 16l4-4 4 4 4-5"/>
          </svg>
          <span>Relatórios</span>
        </a>
      </nav>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 185px;
      min-height: 100vh;
      background: #fff;
      border-right: 1px solid #E8EAED;
      display: flex;
      flex-direction: column;
      padding: 20px 0;
      flex-shrink: 0;
    }

    .sidebar__logo {
      padding: 8px 20px 24px;
      display: flex;
      align-items: center;
    }

    .sidebar__logo-img {
      height: 36px;
      width: auto;
    }

    .sidebar__nav {
      display: flex;
      flex-direction: column;
      gap: 2px;
      padding: 0 8px;
    }

    .sidebar__item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 12px;
      border-radius: 8px;
      text-decoration: none;
      color: #616161;
      font-size: 14px;
      font-weight: 500;
      font-family: 'Plus Jakarta Sans', sans-serif;
      transition: background 0.15s, color 0.15s;

      &:hover:not(.active) {
        background: #F5F7FA;
        color: #15161C;
      }

      &.active {
        background: #79CAEE;
        color: #041825;
        font-weight: 600;
      }
    }

    .sidebar__icon {
      width: 18px;
      height: 18px;
      flex-shrink: 0;
    }
  `]
})
export class SidebarComponent {}
