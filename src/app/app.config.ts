import {
  ApplicationConfig,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from "@angular/core";
import { provideRouter, withComponentInputBinding } from "@angular/router";
import Aura from '@primeuix/themes/aura';
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
      try {
        const update = await check();
      } catch (error) {
        console.log(error);
      }

      // if (update) {
      //   await update.downloadAndInstall();
      //   await relaunch();
      // }
    })
  ],
};
