import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataService} from "../services/data.service";
import {RgOutletInterface} from "../shared/interfaces/rg-outlet-info.interface";
import {RgGeneralInfoInterface} from "../shared/interfaces/rg-general-info.interface";
import {RgInclusionProcessInterface} from "../shared/interfaces/rg-inclusion-process.interface";
import {RgActivityPlanInterface} from "../shared/interfaces/rg-activity-plan.interface";
import {protesUtilityService} from "../services/protes-utility.service";
import {RgActivityList} from "../shared/interfaces/rg-activity-list.interface";
import {RgUpdateHeatmapInterface} from "../shared/interfaces/rg-update-heatmap.interface";

@Component({
  selector: 'app-regional',
  templateUrl: './regional.component.html',
  styleUrls: ['./regional.component.scss']
})
export class RegionalComponent implements OnInit {

  _region: string = '';

  @Input() set region(value : string){
    this.getSessionVariables();
    this.activateInfo();
  };

  get region(): string{
    return this._region
  }

  @Output() regionChange = new EventEmitter<string>();

  public regionName : string | null | undefined;

  public infoIsActive = true;

  public supportIsActive = false;

  public inclusionIsActive = false;

  public outletName : string | null | undefined;

  public minDate = '';

  public columnsGeneralInfo = [
    {
      "key": "typeOfFormulary",
      "description": "TYPE OF FORMULARY",
      "required": true
    },
    {
      "key": "inclusionProcess",
      "description": "INCLUSION PROCESS",
      "required": true
    },
    {
      "key": "averageTimeForCommissionMeeting",
      "description": "AVERAGE TIME FOR COMMISSION MEETING",
      "required": true
    },
    {
      "key": "treatmentPlanAndPrescriptionForm",
      "description": "TREATMENT PLAN AND PRESCRIPTION FORM",
      "required": true
    },
    {
      "key": "centralPurchasingBody",
      "description": "CENTRAL PURCHASING BODY",
      "required": true
    },
    {
      "key": "prescriptionSystem",
      "description": "PRESCRIPTION SYSTEM",
      "required": true
    },
    {
      "key": "EDIT",
      "description": "EDIT",
      "required": true
    }
  ];

  public optionsSupportActivity = [];

  public optionsInclusionProcess = [
    'ONLY REGIONAL',
    'ONLY LOCAL',
    'REGIONAL AND LOCAL'
  ];

  public optionsTreatmentForm = [
    'PAPER',
    'DIGITAL'
  ];

  public optionsOutletCluster = [
    'A',
    'B',
    'C',
    'D'
  ];

  rowsGeneralInfo: RgGeneralInfoInterface[] = [];

  columnsOutletInfo = [
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
      "key": "province",
      "description": "PROVINCE"
    },
    {
      "key": "potentialNumber",
      "description": "POTENTIAL N."
    },
    {
      "key": "potentialPercentage",
      "description": "POTENTIAL %"
    },
    {
      "key": "EDIT",
      "description": "EDIT"
    }
  ];

  rowsOutletInfo: RgOutletInterface[] = [];

  columnsInclusionProcess = [
    {
      "key": "stepNumber",
      "description": "STEP"
    },
    {
      "key": "name",
      "description": "NAME"
    },
    {
      "key": "description",
      "description": "DESCRIPTION"
    },
    {
      "key": "dueDate",
      "description": "EXPECTED DATE"
    },
    {
      "key": "status",
      "description": "STATUS"
    },
    {
      "key": "EDIT",
      "description": "EDIT"
    }
  ];

  rowsInclusionProcess: RgInclusionProcessInterface[] = [];

  rowsInclusionProcessImage: string = '';

  columnsSupportInfo = [
    {
      "key": "name",
      "description": "ACTIVITIES"
    },
    {
      "key": "inclusionStepsInvolved",
      "description": "INCLUSION PROCESS"
    },
    {
      "key": "expectedDate",
      "description": "EXPECTED DATE"
    },
    {
      "key": "criticalIssue",
      "description": "DESCRIPTION"
    },
    {
      "key": "owner",
      "description": "OWNER"
    },
    {
      "key": "stakeholder",
      "description": "STAKEHOLDER"
    },
    {
      "key": "notes",
      "description": "NOTES"
    },
    {
      "key": "EDIT",
      "description": "EDIT"
    }
  ];

  rowsSupportInfo: RgActivityPlanInterface[] = [];

  rowsRegionalActivityList: string[] = [];

  columnsRegionalActivityList: string[] = [];

  isActiveModal = false;

  isActiveModalNotes = false;

  isActiveModalRow = false;

  isActiveModalDropDown = false;

  isActiveModalMultiselect = false;

  public productId = 1;

  public countryId = 1;

  public regionId = 1;

  public outletOnekey = '';

  public endDate: string | null | undefined

  constructor(private dataService: DataService, private us: protesUtilityService) { }

  ngOnInit(): void {
    this.getSessionVariables()
  }

  getSessionVariables(){
    this.regionName = sessionStorage.getItem('regionName');
    this.productId = this.us.getSessionVariableNumber('productId')
    this.countryId = this.us.getSessionVariableNumber('countryId')
    this.regionId = this.us.getSessionVariableNumber('regionId')
  }

  activateInfo(){
    this.infoIsActive = true;
    this.supportIsActive = false;
    this.inclusionIsActive = false;
    this.getSessionVariables()
    this.dataService.getGeneralInfoData(this.productId, this.countryId, this.regionId).subscribe((data: any) => {
      this.rowsGeneralInfo = [data];
    });
    this.dataService.getOutletInfoData(this.productId, this.countryId,this.regionId).subscribe((data: any) => {
      this.rowsOutletInfo = data;
    });
  }

  activateSupport(){
    this.infoIsActive = false;
    this.supportIsActive = true;
    this.inclusionIsActive = false;
    this.getSessionVariables()
    this.dataService.getSupportActivityData(this.productId, this.countryId,this.regionId).subscribe((data: any) => {
      data.forEach((step: any) => {
        if (step.expectedDate) {
          const year = step.expectedDate.substring(0, 4);
          const month = step.expectedDate.substring(4, 6);
          const day = step.expectedDate.substring(6, 8);
          const formattedDate = `${year}-${month}-${day}`;

          if (this.isValidDate(formattedDate)) {
            step.expectedDate = new Date(formattedDate);
          } else {
            console.error(`Invalid date: ${formattedDate}`);
          }
        }
      });
      this.rowsSupportInfo = data;
    });
  }

  activateInclusion(){
    this.infoIsActive = false;
    this.supportIsActive = false;
    this.inclusionIsActive = true;
    this.getSessionVariables();
    if (this.rowsOutletInfo.length > 0) {
      this.outletOnekey = this.rowsOutletInfo[0].onekey;
      this.outletName = this.rowsOutletInfo[0].name;
      sessionStorage.setItem('outletOnekey', this.outletOnekey);
      sessionStorage.setItem('outletName', this.outletName);
      this.dataService.getInclusionProcessData(this.productId, this.countryId, this.regionId, this.outletOnekey).subscribe((data: any) => {
        data.steps.forEach((step: any) => {
          if (step.dueDate) {
            const year = step.dueDate.substring(0, 4);
            const month = step.dueDate.substring(4, 6);
            const day = step.dueDate.substring(6, 8);
            const formattedDate = `${year}-${month}-${day}`;

            if (this.isValidDate(formattedDate)) {
              step.dueDate = new Date(formattedDate);
            } else {
              console.error(`Invalid date: ${formattedDate}`);
            }
          }
        });
        if (data.steps[0].dueDate != null && data.steps[0].dueDate != ""){
          const dueDateValue = data.steps[0].dueDate;
          const year: number = dueDateValue.getFullYear();
          const month: number = dueDateValue.getMonth() + 1;
          const day: number = dueDateValue.getDate();
          this.minDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
          console.log(this.minDate)
        } else {
          this.minDate = '1970-01-01'
        }
        this.rowsInclusionProcessImage = data.image;
        this.rowsInclusionProcess = data.steps;
      });
    }else{
      this.rowsInclusionProcessImage = '';
      this.rowsInclusionProcess = [];
    }
  }

  isValidDate(dateString: string): boolean {
    const regEx = /^\d{4}-\d{2}-\d{2}$/;
    return dateString.match(regEx) !== null;
  }

  onEditClick(row: any): void {
    console.log('Edit Clicked for row:', row);
  }

  onSaveGeneralInfoClick(row: any): void {
    this.getSessionVariables();
    console.log(row)
    this.dataService.updateGeneralInfoData(this.productId, this.countryId, this.regionId, row)
      .subscribe((response: any) => {
          console.log('Dati aggiornati con successo:', response);
          this.activateInfo();
        },
        (error: any) => {
          console.error('Errore durante l\'aggiornamento dei dati:', error);
        }
      );
  }

  onSaveOutletInfoClick(row: any): void {
    this.getSessionVariables();
    console.log(row)
    this.dataService.updateOutletInfoData(this.productId, this.countryId, this.regionId, row)
      .subscribe((response: any) => {
          console.log('Dati aggiornati con successo:', response);
          this.activateInfo();
        },
        (error: any) => {
          console.error('Errore durante l\'aggiornamento dei dati:', error);
        }
      );
  }

  onNotesClick(row: any): void {
    console.log('Edit Clicked for row:', row);
  }

  showModal(value: boolean) {
    this.isActiveModal = value;
    console.log(value);
  }

  showModalNotes(value: boolean) {
    this.isActiveModalNotes = value;
    console.log(value);
  }

  showModalMultiselect(value: boolean) {
    this.isActiveModalMultiselect = value;
    console.log(value);
  }

  showModalDropDown(value: boolean) {
    this.isActiveModalDropDown = value;
    console.log(value);
  }

  importActivitiesFromModal(activities: RgActivityList[]) {
    this.getSessionVariables()
    this.dataService.importActivitiesFromList(this.productId, this.countryId, this.regionId, activities).subscribe((next => {
      this.rowsSupportInfo = next;
    }));
  }

  updateActivityInActivityPlan(data: any) {
    this.getSessionVariables()
    this.dataService.updateActivityInActivityPlan(this.productId, this.countryId, this.regionId, data).subscribe((next => {
      console.log(next);
    }));
  }

  updateInclusionChanges(value: string) {
    this.getSessionVariables();
    sessionStorage.setItem('outletOnekey', value);
    this.outletName = sessionStorage.getItem('outletName');
    this.dataService.getInclusionProcessData(this.productId, this.countryId, this.regionId, value).subscribe((data: any) => {
      data.steps.forEach((step: any) => {
        if (step.dueDate) {
          const year = step.dueDate.substring(0, 4);
          const month = step.dueDate.substring(4, 6);
          const day = step.dueDate.substring(6, 8);
          const formattedDate = `${year}-${month}-${day}`;

          if (this.isValidDate(formattedDate)) {
            step.dueDate = new Date(formattedDate);
          } else {
            console.error(`Invalid date: ${formattedDate}`);
          }
        }
      });
      if (data.steps[0].dueDate != null && data.steps[0].dueDate != ""){
        const dueDateValue = data.steps[0].dueDate;
        const year: number = dueDateValue.getFullYear();
        const month: number = dueDateValue.getMonth() + 1;
        const day: number = dueDateValue.getDate();
        this.minDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        console.log(this.minDate)
      } else {
        this.minDate = '1970-01-01'
      }
      this.rowsInclusionProcess = data.steps;
    });


    console.log(value);
  }

  showModalRow(value: boolean) {
    this.isActiveModalRow = value;
    console.log(value);
  }

  updateInclusionProcessData(value: any) {
    this.getSessionVariables()
    this.outletOnekey = this.us.getSessionVariableString('outletOnekey')
    if (value.dueDate) {

      if (typeof value.dueDate === 'object') {
        value.dueDate = this.us.formatDate(value.dueDate);
      }

      value.dueDate = value.dueDate.replace(/-/g, '');
    }

    if (this.rowsInclusionProcess[value.stepNumber].status !== value.status) {
      if (value.status === 'COMPLETED') {
        value.endDate = this.us.formatDate(new Date());
        value.endDate = value.endDate.replace(/-/g, '');
      } else {
        value.endDate = null;
      }
    }

    console.log(value)
    if (value.coverage || value.stepNumber == 0 || value.sell){
      this.dataService.getInclusionProcessData(this.productId, this.countryId, this.regionId, this.outletOnekey).subscribe((data: any) => {
        this.rowsInclusionProcess = data.steps;
        const extractMonth = (dateString: string | null): string | null => {
          if (!dateString) {
            return null;
          }
          const month = dateString.substring(4, 6);
          const year = dateString.substring(0, 4);
          const formattedMonth = parseInt(month).toString();
          return year + '-' + month;
        };
        // let stepNumber = 3;
        let valueFormattedToTarget = {}
        if (value.stepNumber == 0){
          // stepNumber = 0;
          valueFormattedToTarget = {
            productId: this.productId,
            oldDueDate: extractMonth(this.rowsInclusionProcess[value.stepNumber].dueDate),
            dueDate: extractMonth(value.dueDate),
            countryId: this.countryId
          }
        }else{
          valueFormattedToTarget = {
            productId: this.productId,
            regionId: this.regionId,
            oldDueDate: extractMonth(this.rowsInclusionProcess[value.stepNumber].dueDate),
            dueDate: extractMonth(value.dueDate),
            countryId: this.countryId
          }
        }
        this.dataService.updateInclusionProcessData(this.productId, this.countryId, this.regionId, this.outletOnekey, value).subscribe((data: any) => {
          if (this.rowsInclusionProcess[value.stepNumber].status !== value.status){
            if (value.coverage) {
              valueFormattedToTarget = {
                productId: this.productId,
                regionId: this.regionId,
                dueDate: this.getCurrentDateFormatted(),
                oldDueDate: this.endDate,
                countryId: this.countryId
              }
              this.endDate = this.getCurrentDateFormatted();
              this.dataService.updateActualCoverageData(valueFormattedToTarget).subscribe((data: any) => {
              });
            } else if (value.sell) {
              // update heatmap e open to market
              const data: RgUpdateHeatmapInterface = {
                productId: this.productId,
                countryId: this.countryId,
                regionId: this.regionId,
                outletOnekey: this.outletOnekey,
                oldStepStatus: this.rowsInclusionProcess[value.stepNumber].status,
                newStepStatus: value.status,
              }
              this.dataService.updateHeatmap(data).subscribe((data) => {})
            }

          } else {
            if (value.coverage) {
              this.dataService.updateTargetCoverageData(valueFormattedToTarget).subscribe((data: any) => {});
            } else if (value.sell) {
              valueFormattedToTarget = {...valueFormattedToTarget, outletOnekey: this.outletOnekey};
              this.dataService.updateTargetSellData(valueFormattedToTarget).subscribe((data: any) => {});
            } else if (value.stepNumber == 0) {
              this.dataService.updateTargetCoverageData(valueFormattedToTarget).subscribe((data: any) => {
                valueFormattedToTarget = {...valueFormattedToTarget, outletOnekey: this.outletOnekey};
                this.dataService.updateTargetSellData(valueFormattedToTarget).subscribe((data: any) => {});
              });
            }
          }
          this.activateInclusion();
        });
      });
    } else {
      this.dataService.updateInclusionProcessData(this.productId, this.countryId, this.regionId, this.outletOnekey, value).subscribe((data: any) => {
        this.activateInclusion();
      });
    }

    console.log(value);
  }

  getCurrentDateFormatted(): string {
    const today = new Date();
    const year = today.getFullYear();
    let month = (today.getMonth() + 1).toString(); // Mese è zero-based, quindi aggiungiamo 1
    if (month.length === 1) {
      month = '0' + month; // Aggiungiamo uno zero davanti se il mese è a una sola cifra
    }
    return `${year}-${month}`;
  }

}
