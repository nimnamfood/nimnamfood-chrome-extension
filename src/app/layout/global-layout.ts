import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterBar } from './router-bar';

@Component({
  selector: 'app-global-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-router-bar />

    <main><router-outlet /></main>
  `,
  imports: [RouterBar, RouterOutlet],
})
export default class GlobalLayout {}
