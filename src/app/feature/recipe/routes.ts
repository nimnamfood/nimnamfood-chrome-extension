import { Routes } from '@angular/router';
import { scrapResultResolver } from '@/core/scraping';
import { Import } from '@/feature/recipe/import/import';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'i' },
  { path: 'i', resolve: { scrapResult: scrapResultResolver }, component: Import },
];

export default routes;
