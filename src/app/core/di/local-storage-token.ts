import { inject, InjectionToken } from '@angular/core';
import { injectWindow } from './window-token';

export const IT_LOCAL_STORAGE = new InjectionToken<Storage>('IT_LOCAL_STORAGE', {
  factory: () => injectWindow().localStorage,
});

export function injectLocalStorage(): Storage {
  return inject(IT_LOCAL_STORAGE);
}
