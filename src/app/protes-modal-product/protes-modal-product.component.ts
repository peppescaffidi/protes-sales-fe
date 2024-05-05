import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-protes-modal-product',
  templateUrl: './protes-modal-product.component.html',
  styleUrls: ['./protes-modal-product.component.scss']
})
export class ProtesModalProductComponent implements OnInit {

  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  isActiveModalProduct = false;

  constructor() { }

  ngOnInit(): void {
  }

  oncloseModal(value: boolean) {
    this.closeModal.emit(value);
  }

  openModalProduct(value : boolean){
    this.isActiveModalProduct = value;
  }

}
