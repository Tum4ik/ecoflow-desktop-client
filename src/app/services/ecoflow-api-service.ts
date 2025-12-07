import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { DeviceData, MqttCertificationData } from './settings-service';

const ECOFLOW_API_HOST = 'https://api-e.ecoflow.com';

@Injectable({
  providedIn: 'root',
})
export class EcoflowApiService {
  private readonly http = inject(HttpClient);


  async getMqttCertificationAsync(accessKey: string, secretKey: string): Promise<MqttCertificationResponse | null> {
    const headers = await this.getRequestHeadersAsync(accessKey, secretKey);
    const request = this.http.get<MqttCertificationResponse>(`${ECOFLOW_API_HOST}/iot-open/sign/certification`, {
      headers: headers
    });
    try {
      return await firstValueFrom(request);
    }
    catch (error) {
      return null;
    }
  }


  async getDevicesListAsync(accessKey: string, secretKey: string): Promise<DevicesListResponse | null> {
    const headers = await this.getRequestHeadersAsync(accessKey, secretKey);
    const request = this.http.get<DevicesListResponse>(`${ECOFLOW_API_HOST}/iot-open/sign/device/list`, {
      headers: headers
    });
    try {
      return await firstValueFrom(request);
    }
    catch (error) {
      return null;
    }
  }


  private async getRequestHeadersAsync(accessKey: string, secretKey: string): Promise<HttpHeaders> {
    const timestamp = Date.now().toString();
    const nonce = (Math.floor(Math.random() * 900000) + 100000).toString();

    // the order of the params is important
    // 1. accessKey
    // 2. nonce
    // 3. timestamp
    const params = `accessKey=${accessKey}&nonce=${nonce}&timestamp=${timestamp}`;

    const hmacKey = await crypto.subtle.importKey(
      'raw',
      this.strToUint8Array(secretKey) as BufferSource,
      { name: 'HMAC', hash: 'SHA-256' } as HmacImportParams,
      false,
      ['sign']
    );
    const signatureBuffer = await crypto.subtle.sign('HMAC', hmacKey, this.strToUint8Array(params) as BufferSource);
    const sign = Array.from(new Uint8Array(signatureBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    return new HttpHeaders({
      accessKey: accessKey,
      timestamp: timestamp,
      nonce: nonce,
      sign: sign,
    });
  }


  private strToUint8Array(str: string): Uint8Array {
    return new TextEncoder().encode(str);
  }
}


export interface ApiResponse<TData> {
  code: string;
  message: string;
  data: TData;
}

export interface MqttCertificationResponse extends ApiResponse<MqttCertificationData> { }
export interface DevicesListResponse extends ApiResponse<DeviceData[]> { }
