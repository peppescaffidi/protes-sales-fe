import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtesChartMarketComponent } from './protes-chart-market.component';

describe('ProtesChartMarketComponent', () => {
  let component: ProtesChartMarketComponent;
  let fixture: ComponentFixture<ProtesChartMarketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtesChartMarketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtesChartMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
