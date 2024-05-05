import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtesTableComponent } from './protes-table.component';

describe('ProtesTableComponent', () => {
  let component: ProtesTableComponent;
  let fixture: ComponentFixture<ProtesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
