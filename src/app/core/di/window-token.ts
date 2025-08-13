import { DOCUMENT } from '@angular/common';
import { inject, InjectionToken } from '@angular/core';

export const IT_WINDOW = new InjectionToken<Window>('IT_WINDOW', {
  factory: (): Window => {
    const { defaultView } = inject(DOCUMENT);
    if (!defaultView) {
      throw new Error('Window is not available');
    }
    return defaultView;
  },
});

export function injectWindow(): Window {
  return inject(IT_WINDOW);
}
