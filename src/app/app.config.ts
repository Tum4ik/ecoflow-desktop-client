import {
  ApplicationConfig,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from "@angular/core";
import { provideRouter, withComponentInputBinding } from "@angular/router";
import Aura from '@primeuix/themes/aura';
import { relaunch } from '@tauri-apps/plugin-process';
import { check } from '@tauri-apps/plugin-updater';
import { providePrimeNG } from 'primeng/config';
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes,
      withComponentInputBinding()
    ),
    providePrimeNG({
      theme: {
        preset: Aura
      },
      ripple: true
    }),
    provideAppInitializer(async () => {
      const update = await check();
      if (update) {
        await update.downloadAndInstall();
        await relaunch();
      }
    })
  ],
};
