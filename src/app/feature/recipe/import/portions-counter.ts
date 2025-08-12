import { ChangeDetectionStrategy, Component, effect, forwardRef, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { noop } from 'rxjs';
import { Button } from '@/shared/components/button';

type OnChange = (value: number) => void;

@Component({
  selector: 'app-portions-counter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PortionsCounter),
      multi: true,
    },
  ],
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
    }

    .counter {
      min-width: 20px;
      text-align: center;
      font-size: 1rem;
      user-select: none;
    }
  `,
  template: `
    <button [disabled]="value() < 2" (click)="decrement()" appButton type="button">
      <span class="material-icons-outlined md-18">remove</span>
    </button>

    <div class="counter">{{ value() }}</div>

    <button (click)="increment()" appButton type="button">
      <span class="material-icons-outlined md-18">add</span>
    </button>
  `,
})
export class PortionsCounter implements ControlValueAccessor {
  protected readonly value = signal<number>(1);

  private onChange: OnChange = noop;
  protected onTouched: VoidFunction = noop;

  constructor() {
    effect(() => this.onChange(this.value()));
  }

  protected increment(): void {
    this.value.update(current => current + 1);
  }

  protected decrement(): void {
    this.value.update(current => current - 1);
  }

  writeValue(count: number): void {
    this.value.set(count);
  }

  registerOnChange(fn: OnChange): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: VoidFunction): void {
    this.onTouched = fn;
  }
}
