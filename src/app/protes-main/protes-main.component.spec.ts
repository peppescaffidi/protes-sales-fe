import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtesMainComponent } from './protes-main.component';

describe('ProtesMainComponent', () => {
  let component: ProtesMainComponent;
  let fixture: ComponentFixture<ProtesMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtesMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
