import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: 'register-account',
    loadComponent: () => import('./register-account/register-account').then(c => c.RegisterAccount),
  }
];
