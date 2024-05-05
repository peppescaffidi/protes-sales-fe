import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtesModalDropdownComponent } from './protes-modal-dropdown.component';

describe('ProtesModalDropdownComponent', () => {
  let component: ProtesModalDropdownComponent;
  let fixture: ComponentFixture<ProtesModalDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtesModalDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtesModalDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
