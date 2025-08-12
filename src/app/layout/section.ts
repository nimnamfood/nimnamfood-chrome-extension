import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    h4 {
      margin-bottom: 0.5rem;
      font-weight: 500;
      font-size: 1rem;
      line-height: 1.5rem;
    }
  `,
  template: `
    <section>
      <h4>{{ heading() }}</h4>

      <ng-content />
    </section>
  `,
})
export class Section {
  readonly heading = input.required<string>();
}
