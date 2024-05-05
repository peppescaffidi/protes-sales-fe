import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtesModalMultiselectComponent } from './protes-modal-multiselect.component';

describe('ProtesModalMultiselectComponent', () => {
  let component: ProtesModalMultiselectComponent;
  let fixture: ComponentFixture<ProtesModalMultiselectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtesModalMultiselectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtesModalMultiselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
