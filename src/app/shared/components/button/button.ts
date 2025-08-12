import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'button[appButton]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <span class="app-button__ripple"></span>
    <span class="app-button__label"><ng-content /></span>
  `,
  styleUrl: './button.scss',
  host: {
    class: 'app-button',
    '[attr.disabled]': '!disabled() ? null : true',
    '[class.app-button--disabled]': 'disabled()',
  },
})
export class Button {
  readonly disabled = input<boolean>(false);
}
