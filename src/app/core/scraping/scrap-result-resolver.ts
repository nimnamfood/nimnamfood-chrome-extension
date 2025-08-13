import { inject } from '@angular/core';
import { RedirectCommand, ResolveFn, Router } from '@angular/router';
import { SettingsService } from '@/core/settings';
import { ScrapResult } from './scrap-result';
import { ScrapingService } from './scraping-service';

export const scrapResultResolver: ResolveFn<ScrapResult> = async (): Promise<
  ScrapResult | RedirectCommand
> => {
  const scrapInput = inject(SettingsService).settings();
  const scrapResult = await inject(ScrapingService).scrap(scrapInput);

  if (!scrapResult) {
    return new RedirectCommand(inject(Router).parseUrl('/e'));
  }

  return scrapResult;
};
