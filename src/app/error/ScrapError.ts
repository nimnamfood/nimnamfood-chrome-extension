import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-scrap-error',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>Erreur lors de la récupération des données.</div>
  `,
})
export default class ScrapError {}
