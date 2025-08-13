import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Page } from '@/layout/page';
import { Section } from '@/layout/section';
import { Form } from '@/layout/form';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ControlContainer,
  ControlError,
  NativeControl,
} from '@/shared/components/control-container';
import { Button } from '@/shared/components/button';
import { combineLatest, distinctUntilChanged, map, startWith, Subject } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { SettingsService } from '@/core/settings';

export type SettingsFormModel = {
  nameTarget: FormControl<string>;
  illustrationTarget: FormControl<string>;
  instructionsTarget: FormControl<string>;
};

@Component({
  selector: 'app-settings',
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Button,
    ControlContainer,
    ControlError,
    Form,
    NativeControl,
    Page,
    ReactiveFormsModule,
    Section,
  ],
})
export class Settings {
  private readonly settingsService = inject(SettingsService);

  protected readonly form = new FormGroup<SettingsFormModel>({
    nameTarget: new FormControl(this.settingsService.settings().nameTarget, {
      validators: Validators.required,
      nonNullable: true,
    }),
    illustrationTarget: new FormControl(this.settingsService.settings().illustrationTarget, {
      validators: Validators.required,
      nonNullable: true,
    }),
    instructionsTarget: new FormControl(this.settingsService.settings().instructionsTarget, {
      validators: Validators.required,
      nonNullable: true,
    }),
  });

  private readonly saved$ = new Subject<void>();
  protected readonly unchanged = toSignal(
    combineLatest([
      this.form.valueChanges.pipe(startWith(this.form.getRawValue())),
      this.saved$.pipe(startWith(null)),
    ]).pipe(
      map(([value]) => {
        const { nameTarget, illustrationTarget, instructionsTarget } = this.settingsService.settings();
        return (
          value.nameTarget === nameTarget &&
          value.illustrationTarget === illustrationTarget &&
          value.instructionsTarget === instructionsTarget
        );
      }),
      distinctUntilChanged(),
    ),
    { requireSync: true },
  );

  protected saveSettings(): void {
    this.settingsService.saveSettings(this.form.getRawValue());
    this.saved$.next();
  }
}
