import { Component, inject, input, OnDestroy, OnInit, signal } from '@angular/core';
import { UnlistenFn } from '@tauri-apps/api/event';
import { Card } from 'primeng/card';
import { ProgressBar } from 'primeng/progressbar';
import { QuotaPayload } from './payloads/quota-payload';
import { River2ProCommunicationService } from './river-2-pro-communication-service';

@Component({
  selector: 'edc-river-2-pro',
  templateUrl: './river-2-pro.html',
  styleUrl: './river-2-pro.scss',
  imports: [
    Card,
    ProgressBar,
  ],
  providers: [
    River2ProCommunicationService,
  ],
})
export class River2Pro implements OnInit, OnDestroy {
  readonly deviceName = input.required<string>();
  readonly sn = input.required<string>();

  private readonly communicationService = inject(River2ProCommunicationService);

  protected readonly batteryLevel = signal<number | null>(0);
  protected readonly remainTime = signal<string | null>(null);

  private readonly unlistens: UnlistenFn[] = [];

  async ngOnInit() {
    this.unlistens.push(
      await this.communicationService.observePowerDeliveryAsync(this.sn(), this.onPowerDeliveryPayloadReceived.bind(this)),
    );
  }

  ngOnDestroy(): void {
    for (const unlisten of this.unlistens) {
      unlisten();
    }
  }


  private onPowerDeliveryPayloadReceived(payload: QuotaPayload<'pdStatus'>) {
    this.batteryLevel.set(payload.params.soc);
    const totalRemainMinutes = payload.params.remainTime;
    const remainHours = Math.floor(totalRemainMinutes / 60).toString().padStart(2, '0');
    const remainMinutes = Math.floor(totalRemainMinutes % 60).toString().padStart(2, '0');
    this.remainTime.set(`${remainHours}:${remainMinutes}`);
  }
}
