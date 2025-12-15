import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';
import { listen, UnlistenFn } from '@tauri-apps/api/event';
import { MqttCertificationData } from './settings-service';

@Injectable({
  providedIn: 'root',
})
export class MqttClientService {
  private isConnected = false;

  async connectAsync(certificationData: MqttCertificationData) {
    if (this.isConnected) {
      return;
    }

    const protocol = certificationData.protocol;
    const host = certificationData.url;
    const port = certificationData.port;
    const clientId = 'ecoflow-desktop';
    const url = `${protocol}://${host}:${port}?client_id=${clientId}`;
    await invoke('mqtt_client_connect', {
      url: url,
      username: certificationData.certificateAccount,
      password: certificationData.certificatePassword,
    });

    this.isConnected = true;
  }


  async subscribeAsync<T>(topic: string, handler: (payload: T) => void): Promise<UnlistenFn> {
    const unlisten = await listen<{ topic: string; payload: string; }>('mqtt-client-message', event => {
      const messageTopic = event.payload.topic;
      const messagePayload = event.payload.payload;
      if (messageTopic === topic) {
        const obj = JSON.parse(messagePayload);
        handler?.(obj);
      }
    });

    await invoke('mqtt_client_subscribe', { topic: topic });

    return unlisten;
  }


  async publishAsync(topic: string, payload: any) {
    await invoke('mqtt_client_publish', { topic: topic, payload: JSON.stringify(payload) });
  }
}
