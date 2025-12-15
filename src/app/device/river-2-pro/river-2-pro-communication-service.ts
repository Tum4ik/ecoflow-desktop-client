import { inject, Injectable } from '@angular/core';
import { UnlistenFn } from '@tauri-apps/api/event';
import { MqttClientService } from '../../services/mqtt-client-service';
import { SettingsService } from '../../services/settings-service';
import { QuotaPayload, TypeCode } from './payloads/quota-payload';

@Injectable()
export class River2ProCommunicationService {
  private readonly settingsService = inject(SettingsService);
  private readonly mqttClientService = inject(MqttClientService);

  constructor() {
    this.settingsService.getMqttCertificationDataAsync().then(data => {
      if (data) {
        this.mqttClientService.connectAsync(data);
      }
    });
  }

  async observePowerDeliveryAsync(sn: string, handler: (payload: QuotaPayload<'pdStatus'>) => void): Promise<UnlistenFn> {
    const certificationData = await this.settingsService.getMqttCertificationDataAsync();
    if (!certificationData) {
      // todo: handle error
      throw new Error('no certification data');
    }

    return await this.mqttClientService.subscribeAsync<QuotaPayload<TypeCode>>(
      `/open/${certificationData.certificateAccount}/${sn}/quota`,
      payload => {
        if (payload.typeCode === 'pdStatus') {
          handler?.(payload as QuotaPayload<'pdStatus'>);
        }
      }
    );
  }
}
