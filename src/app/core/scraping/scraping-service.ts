import { Injectable } from '@angular/core';
import { ScrapMessage } from './scrap-message';
import { ScrapResult } from './scrap-result';

@Injectable({ providedIn: 'root' })
export class ScrapingService {
  async scrap(input: ScrapMessage['input']): Promise<ScrapResult | null> {
    const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (!activeTab.id) {
      throw new Error('Could not get id of active tab.');
    }

    const scrapResult = await chrome.tabs.sendMessage<ScrapMessage, ScrapResult | null>(
      activeTab.id,
      { code: 'scrap', input },
    );

    if (!scrapResult) {
      throw new Error('Scraping failed.');
    }

    return scrapResult;
  }
}
