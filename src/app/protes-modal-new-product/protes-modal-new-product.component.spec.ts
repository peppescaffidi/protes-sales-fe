import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtesModalNewProductComponent } from './protes-modal-new-product.component';

describe('ProtesModalNewProductComponent', () => {
  let component: ProtesModalNewProductComponent;
  let fixture: ComponentFixture<ProtesModalNewProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtesModalNewProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtesModalNewProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
