import {
  booleanAttribute,
  Directive,
  ElementRef,
  forwardRef,
  inject,
  input,
  OnChanges,
  OnDestroy,
} from '@angular/core';
import { NgControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Control } from './control';
import { BooleanInput } from '@/core/types';

let nextUniqueId = 0;

@Directive({
  selector: 'input[appNativeControl], textarea[appNativeControl]',
  providers: [
    {
      provide: Control,
      useExisting: forwardRef(() => NativeControl),
    },
  ],
  host: {
    class: 'app-control',
    '[attr.id]': 'id()',
    '(focus)': 'focusChanged(true)',
    '(blur)': 'focusChanged(false)',
  },
})
export class NativeControl<T> implements OnChanges, OnDestroy, Control<T> {
  readonly ngControl = inject(NgControl, { self: true, optional: false });
  private readonly elementRef =
    inject<ElementRef<HTMLInputElement | HTMLTextAreaElement>>(ElementRef);

  value: T | null = null;
  focused = false;

  readonly stateChanges = new Subject<void>();

  private readonly uid = `app-native-control-${nextUniqueId++}`;

  readonly id = input<string, string>(this.uid, { transform: value => value || this.uid });
  readonly required = input<boolean, BooleanInput>(
    this.ngControl.control?.hasValidator(Validators.required) ?? false,
    { transform: booleanAttribute },
  );

  get empty(): boolean {
    return !this.elementRef.nativeElement.value;
  }

  get disabled(): boolean {
    return this.ngControl.disabled ?? false;
  }

  ngOnChanges(): void {
    this.stateChanges.next();
  }

  ngOnDestroy(): void {
    this.stateChanges.complete();
  }

  onContainerClick(): void {
    this.elementRef.nativeElement.focus();
  }

  protected focusChanged(value: boolean): void {
    if (value !== this.focused) {
      this.focused = value;
      this.stateChanges.next();
    }
  }
}
