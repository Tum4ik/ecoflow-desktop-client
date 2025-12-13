import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: 'register-account',
    loadComponent: () => import('./register-account/register-account').then(c => c.RegisterAccount),
  },
  {
    path: 'devices',
    loadComponent: () => import('./devices/devices').then(c => c.Devices),
  },
  {
    path: 'device/:productName/:deviceName/:sn',
    loadComponent: () => import('./device/device').then(c => c.Device),
  }
];
