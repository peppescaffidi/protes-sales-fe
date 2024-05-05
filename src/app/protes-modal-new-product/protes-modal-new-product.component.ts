import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-protes-modal-new-product',
  templateUrl: './protes-modal-new-product.component.html',
  styleUrls: ['./protes-modal-new-product.component.scss']
})
export class ProtesModalNewProductComponent implements OnInit {

  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  public optionsAreaTerapeutica = [
    'Aneshesiology',
    'Cardiology',
    'Critical Care Product',
    'Dermatology',
    'Endocrinology & Metabolism',
    'Gastroenterology',
    'Geriatrics',
    'Gynecology & Obstetrics',
    'Hematology',
    'Immunology & Allergy',
    'Infectious Diseases',
    'Nephrology',
    'Neurology',
    'Nuclear Product',
    'Oncology',
    'Ophthalmology',
    'Orthopedics',
    'Otolaryngology',
    'Physical Product & Rehabilitation',
    'Preventive Product',
    'Psychiatry',
    'Pulmonology',
    'Radiology',
    'Rheumatology',
    'Surgery',
    'Urology'
  ];

  public optionsClasseRimborsabilita = [
    'A',
    'A-PHT',
    'H',
    'C'
  ];

  public optionsClasseFornitura = [
    'RR',
    'RNR',
    'RRL',
    'RNRL',
    'RMS',
    'OSP',
    'OSPL',
    'USPL',
    'OTC',
    'SOP'
  ];

  public optionsTipologiaAccesso = [
    'Nuovo Prodotto Classe H',
    'Nuovo Prodotto Classe A-PHT',
    'Nuova Indicazione di Prodotto Commercializzato Classe H',
    'Nuova Indicazione di Prodotto Commercializzato Classe A-PHT',
    'Nuova Confezione o Posologia o Dosaggio'
  ];

  constructor() { }

  oncloseModal(value: boolean) {
    this.closeModal.emit(value);
  }

  ngOnInit(): void {
  }

}
