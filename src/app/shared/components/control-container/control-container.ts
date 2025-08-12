import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  contentChild,
  contentChildren,
  DestroyRef,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { startWith, tap } from 'rxjs';
import { Control } from './control';
import { ControlError } from './error';

@Component({
  selector: 'app-control-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'control-container.html',
  styleUrl: 'control-container.scss',
  host: {
    class: 'control-container',
    '[class.control-container--invalid]': 'errorChildren().length > 0',
    '[class.control-container--focused]': 'control().focused',
    '[class.control-container--disabled]': 'control().disabled',
    '[class.control-container--empty]': 'control().empty',
  },
})
export class ControlContainer implements AfterContentInit {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);

  readonly control = contentChild.required<Control<unknown>>(Control);
  readonly errorChildren = contentChildren(ControlError, { descendants: true });

  ngAfterContentInit(): void {
    const control = this.control();

    control.stateChanges
      .pipe(
        startWith(null),
        tap(() => this.cdr.markForCheck()),
      )
      .subscribe();

    if (control.ngControl.valueChanges) {
      control.ngControl.valueChanges
        .pipe(
          tap(() => this.cdr.markForCheck()),
          takeUntilDestroyed(this.destroyRef),
        )
        .subscribe();
    }
  }
}
