import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { WebviewWindow } from '@tauri-apps/api/webviewWindow';
import { Button } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { AccountService } from '../services/account-service';
import { DeviceData } from '../services/settings-service';
import { DevicesService } from './devices-service';

@Component({
  selector: 'edc-devices',
  templateUrl: './devices.html',
  styleUrl: './devices.scss',
  imports: [
    TableModule,
    Button,
  ],
  providers: [
    DevicesService
  ],
})
export class Devices implements OnInit {
  private readonly devicesService = inject(DevicesService);
  private readonly router = inject(Router);
  private readonly accountService = inject(AccountService);

  protected readonly devices = signal<DeviceData[]>([]);

  async ngOnInit() {
    if (!await this.accountService.isRegisteredAsync()) {
      await this.router.navigate(['register-account']);
      return;
    }

    this.devicesService.getDevicesAsync().then(devices => this.devices.set(devices));
  }


  batteryLevelWidget(device: DeviceData) {
    const url = `battery-level-widget/${device.productName}/${device.deviceName}/${device.sn}`;
    const widget = new WebviewWindow('battery-level-widget', {
      url: url,
      width: 600,
      minWidth: 300,
      height: 30,
      minHeight: 30,
      decorations: false,
      skipTaskbar: true,
      alwaysOnTop: true,
    });
  }
}


/*
const appWindow = new WebviewWindow('clip-preview-window', {
      decorations: false,
      skipTaskbar: true,
      alwaysOnTop: true,
      url: `full-data-preview/${clipId}`
    });
    await appWindow.onCloseRequested(e => {
      this.ngZone.run(() => {
        this.isWindowBlocked = false;
        this.pasteWindowService.allowHide();
        this.pasteWindowService.focus();
      });
    });
 */
