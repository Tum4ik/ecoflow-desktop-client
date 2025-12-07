import { inject, Injectable } from '@angular/core';
import { EcoflowApiService } from './ecoflow-api-service';
import { SettingsService } from './settings-service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private readonly settingsService = inject(SettingsService);
  private readonly ecoflowApiService = inject(EcoflowApiService);

  async registerAsync(accessKey: string, secretKey: string): Promise<boolean> {
    const certificationResponse = await this.ecoflowApiService.getMqttCertificationAsync(accessKey, secretKey);
    const data = certificationResponse?.data;
    if (certificationResponse?.code === '0' && data) { // success
      await this.settingsService.setAccessKeyAsync(accessKey);
      await this.settingsService.setSecretKeyAsync(secretKey);
      await this.settingsService.setMqttCertificationDataAsync(data);
      return true;
    }

    // todo: return also certificationResponse.message to display on error
    return false;
  }

  async isRegisteredAsync(): Promise<boolean> {
    return await this.settingsService.hasAccessKeyAsync()
      && await this.settingsService.hasSecretKeyAsync()
      && await this.settingsService.hasMqttCertificationDataAsync();
  }
}
