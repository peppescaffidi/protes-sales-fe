import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtesChartComponent } from './protes-chart.component';

describe('ProtesChartComponent', () => {
  let component: ProtesChartComponent;
  let fixture: ComponentFixture<ProtesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtesChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
