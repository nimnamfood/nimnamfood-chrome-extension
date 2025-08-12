import { Directive, Signal } from '@angular/core';
import { AbstractControlDirective, NgControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Directive()
export abstract class Control<T> {
  abstract value: T | null;

  abstract readonly stateChanges: Observable<void>;

  abstract readonly id: Signal<string>;
  abstract readonly ngControl: NgControl | AbstractControlDirective;
  abstract readonly focused: boolean;
  abstract readonly empty: boolean;
  abstract readonly required: Signal<boolean>;
  abstract readonly disabled: boolean;

  abstract onContainerClick(event: MouseEvent): void;
}
