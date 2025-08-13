import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { apiProxyInterceptor } from '@/core/http';
import { RecipeHttpRepository, RecipeRepository } from '@/core/recipe';
import { IllustrationHttpRepository, IllustrationRepository } from '@/core/illustration';
import { SettingsService } from '@/core/settings';
import { routes } from './routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(withFetch(), withInterceptors([apiProxyInterceptor])),
    provideRouter(routes),
    provideAppInitializer(() => {
      inject(SettingsService).loadSettings();
    }),
    { provide: RecipeRepository, useClass: RecipeHttpRepository },
    { provide: IllustrationRepository, useClass: IllustrationHttpRepository },
  ],
};
