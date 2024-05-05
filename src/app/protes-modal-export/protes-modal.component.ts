import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {DataService} from "../services/data.service";
import {protesUtilityService} from "../services/protes-utility.service";

@Component({
  selector: 'app-protes-modal',
  templateUrl: './protes-modal.component.html',
  styleUrls: ['./protes-modal.component.scss']
})
export class ProtesModalComponent implements OnInit {

  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement> | undefined;

  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() saveClick: EventEmitter<any> = new EventEmitter<any>();

  public productId = 1;

  public regionId = 1;

  constructor(private dataService: DataService, private us: protesUtilityService) { }

  ngOnInit(): void {
  }

  browseFiles(): void {
    if (this.fileInput && this.fileInput.nativeElement) {
      this.fileInput.nativeElement.click();
    }
  }

  onFileSelected(event: any): void {
    event.preventDefault();
    event.stopPropagation();
    const file: File = event.target.files[0];
    this.uploadFile(file);
  }

  getSessionVariables(){
    this.productId = this.us.getSessionVariableNumber('productId')
    this.regionId = this.us.getSessionVariableNumber('regionId')
  }

  uploadFile(file: File): void {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    this.getSessionVariables();
    this.dataService.importOutletFromExcel(this.productId, this.regionId, formData)
      .subscribe((response: any) => {
          console.log('Dati aggiornati con successo:');
          this.saveClick.emit('200 OK');
          this.closeModal.emit(false);
        },
        (error: any) => {
          console.error('Errore durante l\'aggiornamento dei dati:', error);
        }
      );
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const dataTransfer: DataTransfer | null = event.dataTransfer;
    if (dataTransfer) {
      const files: FileList | null = dataTransfer.files;
      if (files && files.length > 0) {
        const file: File = files[0];
        this.uploadFile(file);
      }
    }
  }

  oncloseModal(value: boolean) {
    this.closeModal.emit(value);
  }
}
