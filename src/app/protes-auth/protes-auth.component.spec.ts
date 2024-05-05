import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtesAuthComponent } from './protes-auth.component';

describe('ProtesAuthComponent', () => {
  let component: ProtesAuthComponent;
  let fixture: ComponentFixture<ProtesAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtesAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtesAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
