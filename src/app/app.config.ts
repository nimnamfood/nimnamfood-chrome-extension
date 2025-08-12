import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { apiProxyInterceptor } from '@/core/http';
import { RecipeHttpRepository, RecipeRepository } from '@/core/recipe';
import { IllustrationHttpRepository, IllustrationRepository } from '@/core/illustration';
import { routes } from './routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(withFetch(), withInterceptors([apiProxyInterceptor])),
    provideRouter(routes),
    { provide: RecipeRepository, useClass: RecipeHttpRepository },
    { provide: IllustrationRepository, useClass: IllustrationHttpRepository },
  ],
};
