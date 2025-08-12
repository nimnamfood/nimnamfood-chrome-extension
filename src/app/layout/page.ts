import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    :host {
      display: block;
      padding: 1rem;
    }

    h3 {
      margin-bottom: 1rem;
      font-weight: 400;
      font-size: 1.375rem;
      line-height: 1.75rem;
    }
  `,
  template: `
    <header>
      <h3>{{ heading() }}</h3>
    </header>

    <main><ng-content /></main>
  `,
})
export class Page {
  readonly heading = input.required<string>();
}
