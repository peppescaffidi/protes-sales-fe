import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-protes-modal-notes',
  templateUrl: './protes-modal-notes.component.html',
  styleUrls: ['./protes-modal-notes.component.scss']
})
export class ProtesModalNotesComponent implements OnInit {

  @Input() comments: string[] = [];

  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  oncloseModal(value: boolean) {
    this.closeModal.emit(value);
  }

  addComment(): void {
  }

}
