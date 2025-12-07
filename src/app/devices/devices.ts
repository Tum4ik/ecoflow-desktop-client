import { Component, inject, OnInit, signal } from '@angular/core';
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

  protected readonly devices = signal<DeviceData[]>([]);

  ngOnInit(): void {
    this.devicesService.getDevicesAsync().then(devices => this.devices.set(devices));
  }


  observe(device: DeviceData) {

  }
}
