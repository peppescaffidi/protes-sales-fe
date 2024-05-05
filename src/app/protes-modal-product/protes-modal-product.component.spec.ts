import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtesModalProductComponent } from './protes-modal-product.component';

describe('ProtesModalProductComponent', () => {
  let component: ProtesModalProductComponent;
  let fixture: ComponentFixture<ProtesModalProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtesModalProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtesModalProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
