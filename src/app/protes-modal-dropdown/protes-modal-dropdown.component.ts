import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RgOutletInterface} from "../shared/interfaces/rg-outlet-info.interface";
import {DataService} from "../services/data.service";
import {protesUtilityService} from "../services/protes-utility.service";

@Component({
  selector: 'app-protes-modal-dropdown',
  templateUrl: './protes-modal-dropdown.component.html',
  styleUrls: ['./protes-modal-dropdown.component.scss']
})
export class ProtesModalDropdownComponent implements OnInit {

  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() updateChanges: EventEmitter<string> = new EventEmitter<string>();

  @Input() title: string | undefined;

  @Input() rows: RgOutletInterface[] | undefined;

  selectedRowIndex: number = -1;

  public regionId = 1;

  public productId = 1;

  public countryId = 10;

  constructor(
    private dataService: DataService,
    private us: protesUtilityService,
  ) {}

  ngOnInit(): void {
    this.productId = this.us.getSessionVariableNumber('productId')
    this.regionId = this.us.getSessionVariableNumber('regionId')
    this.countryId = this.us.getSessionVariableNumber('countryId')

    this.dataService.getOutletInfoData(this.productId,this.countryId, this.regionId).subscribe((data: RgOutletInterface[]) => {
      this.rows = data;
    });
  }

  oncloseModal(value: boolean) {
    this.closeModal.emit(value);
  }

  onSaveClick(value: boolean): void {
    if (this.selectedRowIndex !== null && this.selectedRowIndex !== undefined) {
      if (this.rows !== undefined){
        const selectedOnekey = this.rows[this.selectedRowIndex].onekey;
        const selectedName = this.rows[this.selectedRowIndex].name;
        sessionStorage.setItem('outletName', selectedName);
        this.updateChanges.emit(selectedOnekey);
        console.log('Selected Onekey:', selectedOnekey);
      }
    } else {
      console.log('Nessuna riga selezionata.');
    }
    this.oncloseModal(false);
  }

  selectRow(index: number): void {
    this.selectedRowIndex = index;
  }

}
