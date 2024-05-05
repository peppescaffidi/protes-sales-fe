import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RgOutletInterface} from "../shared/interfaces/rg-outlet-info.interface";
import {DataService} from "../services/data.service";
import {RgActivityList} from "../shared/interfaces/rg-activity-list.interface";

@Component({
  selector: 'app-protes-modal-multiselect',
  templateUrl: './protes-modal-multiselect.component.html',
  styleUrls: ['./protes-modal-multiselect.component.scss']
})
export class ProtesModalMultiselectComponent implements OnInit {

  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() selected = new EventEmitter<RgActivityList[]>();

  @Input() title: string | undefined;

  @Input() rows: RgActivityList[] | undefined;

  selectedRowIndex: number = -1;

  selectedRows: RgActivityList[] = []; // Array per memorizzare le righe selezionate

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataService.getRegionalActivityList().subscribe((data: RgActivityList[]) => {
      this.rows = data;
    });
  }

  oncloseModal(value: boolean) {
    this.closeModal.emit(value);
    this.selected.emit(this.selectedRows);
  }

  onSaveClick(): void {
    console.log('Save Clicked');
    this.oncloseModal(false);
  }

  selectRow(index: number): void {
    const selectedRow = this.rows![index]; // Ottieni la riga selezionata
    if (this.selectedRows.includes(selectedRow)) {
      this.selectedRows = this.selectedRows.filter(row => row !== selectedRow);
    } else {
      this.selectedRows.push(selectedRow);
    }
    console.log(this.selectedRows)
    console.log(selectedRow)
  }
}
