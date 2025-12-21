import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatteryLevelWidget } from './battery-level-widget';

describe('BatteryLevelWidget', () => {
  let component: BatteryLevelWidget;
  let fixture: ComponentFixture<BatteryLevelWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BatteryLevelWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatteryLevelWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
