import { Routes } from '@angular/router';
import GlobalLayout from '@/layout/global-layout';
import recipeRoutes from '@/feature/recipe/routes';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'r' },
  { path: 'r', component: GlobalLayout, children: recipeRoutes },
];
