import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-global-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main><router-outlet /></main>
  `,
  imports: [RouterOutlet],
})
export default class GlobalLayout {}
