import {
  ApplicationConfig,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from "@angular/core";
import { provideRouter, withComponentInputBinding } from "@angular/router";
import Aura from '@primeuix/themes/aura';
import { relaunch } from '@tauri-apps/plugin-process';
import { check, Update } from '@tauri-apps/plugin-updater';
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
      // todo: move update logic to update service
      let update: Update | null = null;
      try {
        update = await check();
      } catch (error) {
        // can't check update - maybe first release
      }

      if (update) {
        try {
          await update.downloadAndInstall();
          await relaunch();
        } catch (error) {
          // can't download and install
        }
      }
    })
  ],
};
