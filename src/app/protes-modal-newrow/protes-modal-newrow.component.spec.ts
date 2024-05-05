import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtesModalNewrowComponent } from './protes-modal-newrow.component';

describe('ProtesModalNewrowComponent', () => {
  let component: ProtesModalNewrowComponent;
  let fixture: ComponentFixture<ProtesModalNewrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtesModalNewrowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtesModalNewrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
