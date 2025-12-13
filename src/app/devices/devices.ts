import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Button } from 'primeng/button';
import { TableModule } from 'primeng/table';
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

  protected readonly devices = signal<DeviceData[]>([]);

  ngOnInit(): void {
    this.devicesService.getDevicesAsync().then(devices => this.devices.set(devices));
  }


  observe(device: DeviceData) {
    this.router.navigate(['device', device.productName, device.deviceName, device.sn]);
  }
}
