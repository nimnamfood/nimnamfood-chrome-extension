import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-router-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    :host {
      display: block;
      height: 48px;
      border-bottom: 1px solid var(--sys-on-surface);
    }

    nav {
      width: 100%;
      height: 100%;
      display: flex;
    }

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      text-decoration: none;
      color: var(--sys-primary);
      height: 100%;

      &.active,
      &:hover {
        background-color: var(--sys-surface-variant);
      }

      &:not(:last-of-type) {
        border-right: 1px solid var(--sys-on-surface);
      }
    }
  `,
  template: `
    <nav>
      <a routerLink="/i" routerLinkActive="active">Import</a>
      <a routerLink="/s" routerLinkActive="active">Paramètres</a>
    </nav>
  `,
  imports: [RouterLink, RouterLinkActive],
})
export class RouterBar {}
