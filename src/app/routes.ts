import { Routes } from '@angular/router';
import GlobalLayout from '@/layout/global-layout';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'r' },
  {
    path: '',
    component: GlobalLayout,
    loadChildren: () =>
      Promise.all([
        import('@/feature/recipe/routes'),
        import('@/feature/settings/routes'),
        import('./error/routes'),
      ]).then(routes => routes.flatMap(({ default: route }) => route)),
  },
];
