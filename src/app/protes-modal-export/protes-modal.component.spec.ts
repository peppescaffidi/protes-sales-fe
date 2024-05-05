import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtesModalComponent } from './protes-modal.component';

describe('ProtesModalComponent', () => {
  let component: ProtesModalComponent;
  let fixture: ComponentFixture<ProtesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtesModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
