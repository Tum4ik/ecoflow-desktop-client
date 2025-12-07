import { Injectable } from '@angular/core';
import { LazyStore } from '@tauri-apps/plugin-store';

const ACCESS_KEY = 'access-key';
const SECRET_KEY = 'secret-key';
const MQTT_CERTIFICATION_DATA = 'mqtt-certification-data';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private readonly store = new LazyStore('settings.json', { autoSave: false, defaults: {} });


  async getAccessKeyAsync(): Promise<string | undefined> {
    return await this.store.get<string>(ACCESS_KEY);
  }

  async setAccessKeyAsync(accessKey: string): Promise<void> {
    await this.store.set(ACCESS_KEY, accessKey);
    await this.store.save();
  }

  async hasAccessKeyAsync(): Promise<boolean> {
    return await this.store.has(ACCESS_KEY);
  }


  async getSecretKeyAsync(): Promise<string | undefined> {
    return await this.store.get<string>(SECRET_KEY);
  }

  async setSecretKeyAsync(secretKey: string): Promise<void> {
    await this.store.set(SECRET_KEY, secretKey);
    await this.store.save();
  }

  async hasSecretKeyAsync(): Promise<boolean> {
    return await this.store.has(SECRET_KEY);
  }


  async getMqttCertificationDataAsync(): Promise<MqttCertificationData | undefined> {
    return await this.store.get<MqttCertificationData>(MQTT_CERTIFICATION_DATA);
  }

  async setMqttCertificationDataAsync(data: MqttCertificationData): Promise<void> {
    await this.store.set(MQTT_CERTIFICATION_DATA, data);
    await this.store.save();
  }

  async hasMqttCertificationDataAsync(): Promise<boolean> {
    return await this.store.has(MQTT_CERTIFICATION_DATA);
  }
}


export interface MqttCertificationData {
  certificateAccount: string;
  certificatePassword: string;
  url: string;
  port: string;
  protocol: string;
}

export interface DeviceData {
  sn: string;
  online: boolean;
  deviceName: string;
  productName: string;
}
