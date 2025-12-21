import { Component, inject, input, inputBinding, OnInit, ViewContainerRef } from '@angular/core';
import { River2Pro } from './river-2-pro/river-2-pro';

@Component({
  selector: 'edc-battery-level-widget',
  templateUrl: './battery-level-widget.html',
  styleUrl: './battery-level-widget.scss',
  imports: [],
  host: {
    'data-tauri-drag-region': '',
  }
})
export class BatteryLevelWidget implements OnInit {
  readonly productName = input.required<string>();
  readonly deviceName = input.required<string>();
  readonly sn = input.required<string>();

  private readonly viewContainer = inject(ViewContainerRef);

  ngOnInit(): void {
    if (this.productName() === 'RIVER 2 Pro') {
      this.viewContainer.createComponent(River2Pro, {
        bindings: [
          inputBinding('deviceName', this.deviceName),
          inputBinding('sn', this.sn),
        ]
      });
    }
  }
}
