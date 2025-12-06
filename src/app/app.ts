import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { firstValueFrom } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
  imports: [RouterOutlet],
})
export class App {
  constructor(private readonly http: HttpClient) {
  }


  async greet(event: SubmitEvent, name: string) {


    const accessKey = '';
    const secretKey = '';
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

    // const request = this.http.get('https://api-e.ecoflow.com/iot-open/sign/certification', {
    const request = this.http.get('https://api-e.ecoflow.com/iot-open/sign/device/list', {
      headers: {
        accessKey: accessKey,
        timestamp: timestamp,
        nonce: nonce,
        sign: sign,
      },
      observe: 'response'
    });
    const response = await firstValueFrom(request);
    console.log(response.status);
    console.log(response.body);
  }

  private strToUint8Array(str: string): Uint8Array {
    return new TextEncoder().encode(str);
  }
}
