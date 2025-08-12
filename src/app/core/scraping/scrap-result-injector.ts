import { inject, InjectionToken, Provider, Signal, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScrapResult } from './scrap-result';

export const SCRAP_RESULT = new InjectionToken<Signal<ScrapResult>>('SCRAPRESULT');

export function provideScrapResult(): Provider {
  return {
    provide: SCRAP_RESULT,
    useFactory: (): Signal<ScrapResult> => {
      const data = inject(ActivatedRoute).snapshot.data;

      if ('scrapResult' in data) {
        return signal(data['scrapResult']).asReadonly();
      } else {
        throw new Error(`Missing "scrapResult" in route data. Did you forget to add the resolver?`);
      }
    },
  };
}

export function injectScrapResult(): Signal<ScrapResult> {
  return inject(SCRAP_RESULT);
}
