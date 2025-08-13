import { Injectable, signal, WritableSignal } from '@angular/core';
import { injectLocalStorage } from '@/core/di/local-storage-token';
import { Settings } from './settings';
import { defaultSettings } from './default-settings';

const NIMNAMFOOD_SETTINGS = 'NimnamfoodSettings';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private readonly storage = injectLocalStorage();

  readonly settings: WritableSignal<Settings> = signal({ ...defaultSettings });

  loadSettings(): void {
    this.settings.set(this.getSettings());
  }

  saveSettings(settings: Settings): void {
    this.storage.setItem(NIMNAMFOOD_SETTINGS, JSON.stringify(settings));
    this.settings.set(settings);
  }

  private getSettings(): Settings {
    const savedSettings = this.storage.getItem(NIMNAMFOOD_SETTINGS);
    return savedSettings
      ? { ...defaultSettings, ...JSON.parse(savedSettings) }
      : { ...defaultSettings };
  }
}
