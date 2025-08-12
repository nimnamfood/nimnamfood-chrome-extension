import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'form[appForm]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-content />
  `,
  styles: `
    form[appForm] {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      .row {
        display: flex;
        align-items: center;
        gap: 1rem;

        > .control-container {
          flex: 1;
        }
      }

      .submit-row {
        display: flex;
        align-items: center;
        justify-content: end;
        gap: 0.5rem;
      }
    }
  `,
})
export class Form {}
