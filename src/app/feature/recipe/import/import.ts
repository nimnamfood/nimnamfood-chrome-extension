import { ChangeDetectionStrategy, Component, inject, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  finalize,
  map,
  of,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { injectScrapResult, provideScrapResult } from '@/core/scraping';
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
import { Recipe, RecipeRepository } from '@/core/recipe';
import { injectWindow } from '@/core/di';
import { environment } from '@/env';
import {
  illustrationBlobMaxBytesSize,
  IllustrationRepository,
  isValidIllustrationBlob,
} from '@/core/illustration';

type RecipeFormModel = {
  name: FormControl<string>;
  portionsCount: FormControl<number>;
  instructions: FormControl<string>;
};

type SimilarRecipe = Recipe & { url: string };

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

  protected readonly similarRecipes: Signal<SimilarRecipe[] | undefined> = toSignal(
    this.form.controls.name.valueChanges.pipe(
      startWith(this.form.controls.name.value),
      debounceTime(300),
      filter(value => value.length > 2),
      distinctUntilChanged(),
      switchMap(value => this.recipeRepository.search(value)),
      map(recipes =>
        recipes.map(recipe => ({ ...recipe, url: `${environment.appUrl}/r/${recipe.id}` })),
      ),
    ),
  );

  protected readonly importing = signal(false);

  protected import(): void {
    this.importing.set(true);

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
          this.importing.set(false);
        }),
      )
      .subscribe();
  }
}
