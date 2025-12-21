import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./devices/devices').then(c => c.Devices),
  },
  {
    path: 'register-account',
    loadComponent: () => import('./register-account/register-account').then(c => c.RegisterAccount),
  },
  {
    path: 'battery-level-widget/:productName/:deviceName/:sn',
    loadComponent: () => import('./battery-level-widget/battery-level-widget').then(c => c.BatteryLevelWidget),
  }
];
