import { inject, Injectable } from '@angular/core';
import { EcoflowApiService } from '../services/ecoflow-api-service';
import { DeviceData, SettingsService } from '../services/settings-service';

@Injectable()
export class DevicesService {
  private readonly ecoflowApiService = inject(EcoflowApiService);
  private readonly settingsService = inject(SettingsService);

  // todo: instead fetching devices from remote each time:
  // 1. Save a list of devices to settings service
  // 2. Provide a possibility to manually request adding of a new device ("Add" button)
  async getDevicesAsync(): Promise<DeviceData[]> {
    const accessKey = await this.settingsService.getAccessKeyAsync();
    const secretKey = await this.settingsService.getSecretKeyAsync();
    if (!accessKey || !secretKey) {
      // todo: propagate error
      return [];
    }

    const devicesResponse = await this.ecoflowApiService.getDevicesListAsync(accessKey, secretKey);
    if (!devicesResponse || devicesResponse.code !== '0' || !devicesResponse.data) {
      // todo: propagate error
      return [];
    }

    return devicesResponse.data;
  }
}
