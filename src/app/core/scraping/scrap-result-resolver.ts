import { ScrapResult } from './scrap-result';
import { ScrapMessage } from '@/core/scraping/scrap-message';

export const scrapResultResolver = async () => {
  const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!activeTab.id) {
    throw new Error('Could not get id of active tab.');
  }

  const scrapResult = await chrome.tabs.sendMessage<ScrapMessage, ScrapResult | null>(
    activeTab.id,
    {
      code: 'scrap',
      input: {
        nameTarget: 'sc-dzdUWt',
        illustrationTarget: 'sc-kNOvfK',
        instructionsTarget: 'sc-gggxJe',
      },
    },
  );

  if (!scrapResult) {
    throw new Error('Scraping failed.');
  }

  return scrapResult;
};
