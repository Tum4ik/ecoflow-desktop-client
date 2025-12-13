import { DatePipe } from '@angular/common';
import { Component, inject, input, OnDestroy, OnInit, signal } from '@angular/core';
import { UnlistenFn } from '@tauri-apps/api/event';
import { Card } from 'primeng/card';
import { ProgressBar } from 'primeng/progressbar';
import { River2ProCommunicationService } from './river-2-pro-communication-service';

@Component({
  selector: 'edc-river-2-pro',
  templateUrl: './river-2-pro.html',
  styleUrl: './river-2-pro.scss',
  imports: [
    Card,
    ProgressBar,
    DatePipe,
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
  protected readonly remainTime = signal<number | null>(null);

  private readonly unlistens: UnlistenFn[] = [];

  async ngOnInit() {
    const unlisten = await this.communicationService.observePowerDeliveryAsync(this.sn(), payload => {
      this.batteryLevel.set(payload.params.soc);
      this.remainTime.set(payload.params.remainTime * 60 * 1000);
    });

    this.unlistens.push(unlisten);
  }

  ngOnDestroy(): void {
    this.unlistens.forEach(unlisten => unlisten());
  }
}
