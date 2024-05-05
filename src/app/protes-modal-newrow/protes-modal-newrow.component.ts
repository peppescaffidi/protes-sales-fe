import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-protes-modal-newrow',
  templateUrl: './protes-modal-newrow.component.html',
  styleUrls: ['./protes-modal-newrow.component.scss']
})
export class ProtesModalNewrowComponent implements OnInit {

  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() saveClick: EventEmitter<any> = new EventEmitter<any>();

  columns = [
    {
      "key": "onekey",
      "description": "CODICE ONEKEY"
    },
    {
      "key": "cluster",
      "description": "OUTLET CLUSTER"
    },
    {
      "key": "name",
      "description": "OUTLET"
    },
    {
      "key": "city",
      "description": "CITY"
    },
    {
      "key": "averageTimeForCommissionMeeting",
      "description": "AVERAGE TIME FOR COMMISSION MEETING"
    },
    {
      "key": "potentialNumber",
      "description": "POTENTIAL N."
    },
    {
      "key": "potentialPercentage",
      "description": "POTENTIAL %"
    }
  ];

  rows: any = {};

  constructor() { }

  ngOnInit(): void {
  }

  oncloseModal(value: boolean) {
    this.closeModal.emit(value);
  }

  onSaveClick(): void {
    console.log(this.rows)
    this.saveClick.emit(this.rows)
    this.oncloseModal(false);
  }
}
