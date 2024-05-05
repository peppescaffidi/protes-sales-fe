import {Component, EventEmitter, Input, OnInit, Output, Pipe, PipeTransform} from '@angular/core';
import {DataService} from "../services/data.service";
import {protesUtilityService} from "../services/protes-utility.service";

@Component({
  selector: 'app-protes-table',
  templateUrl: './protes-table.component.html',
  styleUrls: ['./protes-table.component.scss']
})
export class ProtesTableComponent implements OnInit{

  @Input() columns: any[] = [];

  @Input() rows: any[] = [];

  @Input() title: string | undefined;

  @Input() bulkEdit: boolean | undefined;

  @Input() importCSV: boolean | undefined;

  @Input() listaAttivita: boolean | undefined;

  @Input() addRow: boolean | undefined;

  @Input() options: any[] = [];

  @Input() optionsTwo: any[] = [];

  @Input() optionsThree: any[] = [];

  @Input() minDate = '';

  @Output() editClick: EventEmitter<any> = new EventEmitter<any>();

  @Output() saveClick: EventEmitter<any> = new EventEmitter<any>();

  @Output() notesClick: EventEmitter<any> = new EventEmitter<any>();

  @Output() multiselectClick: EventEmitter<any> = new EventEmitter<any>();

  @Output() rowClick: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() showModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  showSaveButton = false;

  editedData: any = {};

  editMode: boolean = false;

  editedRowIndex: number = 0;

  public productId = 1;

  public countryId = 1;

  public regionId = 1;

  constructor(private dataService: DataService, private us: protesUtilityService) { }

  ngOnInit(): void {
  }

  isRowInEditMode(index: number): boolean {
    return this.editMode && this.editedRowIndex === index;
  }

  onEditClick(rowIndex: number): void {
    this.editMode = true;
    this.editedRowIndex = rowIndex;
    this.editClick.emit(rowIndex);
    this.showSaveButton = true;
    this.editedData = this.rows;
    if (!this.editedData[rowIndex]) {
      this.editedData[rowIndex] = { ...this.rows[rowIndex] };
    }
  }


  onSaveClick(): void {
    this.editMode = false;
    this.showSaveButton = false;
    this.saveClick.emit(this.editedData[this.editedRowIndex])
  }

  openModal(value: boolean) {
    this.showModal.emit(value);
  }

  openModalNotes(value: boolean, riga: number ) {
    this.notesClick.emit(value);
  }
  openModalRow(value: boolean) {
    this.rowClick.emit(value);
    console.log('ciao')
  }

  openModalMultiselect(value: boolean) {
    this.multiselectClick.emit(value);
  }

  isColonnaActivities(colonna: string): boolean {
    let i = false;
    if (colonna == 'ACTIVITIES'){
      i = true;
    }
    return i;
  }

  getBackgroundColorClass(number: string): string {
    switch (number) {
      case 'OPEN':
        return 'protes-background-white';
      case 'IN_PROGRESS':
        return 'protes-background-yellow';
      case 'EXPIRED':
        return 'protes-background-red';
      case 'COMPLETED':
        return 'protes-background-green';
      default:
        return '';
    }
  }

  getRowBackgroundColorClass(number: boolean): string {
    if(number) {
      return 'protes-row-background-local';
    }else{
      return '';
    }
  }

  formattedDate(dateValue: string): string {
    const dateObject = new Date(dateValue);
    const year = dateObject.getFullYear();
    let month = (1 + dateObject.getMonth()).toString().padStart(2, '0');
    let day = dateObject.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

}
