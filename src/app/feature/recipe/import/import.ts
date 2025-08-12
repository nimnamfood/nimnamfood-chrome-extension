import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { injectScrapResult, provideScrapResult } from '@/core/scraping';
import { NgOptimizedImage } from '@angular/common';
import { finalize, of, switchMap, tap } from 'rxjs';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { Button } from '@/shared/components/button';
import {
  ControlContainer,
  ControlError,
  NativeControl,
} from '@/shared/components/control-container';
import { Page } from '@/layout/page';
import { Section } from '@/layout/section';
import { Form } from '@/layout/form';
import { PortionsCounter } from '@/feature/recipe/import/portions-counter';
import { RecipeRepository } from '@/core/recipe';
import { injectWindow } from '@/core/di';
import { environment } from '@/env';
import {
  illustrationBlobMaxBytesSize,
  IllustrationRepository,
  isValidIllustrationBlob,
} from '@/core/illustration';

export type RecipeFormModel = {
  name: FormControl<string>;
  portionsCount: FormControl<number>;
  instructions: FormControl<string>;
};

@Component({
  selector: 'app-import',
  templateUrl: 'import.html',
  styleUrl: 'import.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideScrapResult()],
  imports: [
    Button,
    ControlContainer,
    ControlError,
    Form,
    NativeControl,
    NgOptimizedImage,
    Page,
    PortionsCounter,
    ReactiveFormsModule,
    Section,
  ],
})
export class Import {
  private readonly illustrationRepository = inject(IllustrationRepository);
  private readonly recipeRepository = inject(RecipeRepository);
  protected readonly scrapResult = injectScrapResult();
  private readonly windowRef = injectWindow();

  protected readonly form = new FormGroup<RecipeFormModel>({
    name: new FormControl(this.scrapResult().name, {
      validators: Validators.required,
      nonNullable: true,
    }),
    portionsCount: new FormControl(this.scrapResult().portionsCount, {
      validators: [Validators.required, Validators.min(1)],
      nonNullable: true,
    }),
    instructions: new FormControl(this.scrapResult().instructions, {
      validators: Validators.required,
      nonNullable: true,
    }),
  });

  protected readonly loading = signal(false);

  protected import(): void {
    this.loading.set(true);

    fromPromise(fetch(this.scrapResult().illustrationUrl).then(result => result.blob()))
      .pipe(
        switchMap(initialBlob =>
          isValidIllustrationBlob(initialBlob)
            ? of(initialBlob)
            : this.illustrationRepository.compress(initialBlob, {
                targetSize: illustrationBlobMaxBytesSize - 10_000,
              }),
        ),
        switchMap(illustrationBlob => this.illustrationRepository.create(illustrationBlob)),
        switchMap(illustration =>
          this.recipeRepository.create({
            ...this.form.getRawValue(),
            illustrationId: illustration.id,
          }),
        ),
        tap(recipe => {
          this.windowRef.open(`${environment.appUrl}/r/e/${recipe.id}`, '_blank');
        }),
        finalize(() => {
          this.loading.set(false);
        }),
      )
      .subscribe();
  }
}
