import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtesModalNotesComponent } from './protes-modal-notes.component';

describe('ProtesModalNotesComponent', () => {
  let component: ProtesModalNotesComponent;
  let fixture: ComponentFixture<ProtesModalNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtesModalNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtesModalNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
