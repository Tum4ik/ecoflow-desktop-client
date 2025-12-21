import { ComponentFixture, TestBed } from '@angular/core/testing';

import { River2Pro } from './river-2-pro';

describe('River2Pro', () => {
  let component: River2Pro;
  let fixture: ComponentFixture<River2Pro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [River2Pro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(River2Pro);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
