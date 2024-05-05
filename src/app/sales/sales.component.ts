import { Component, OnInit } from '@angular/core';
import {DataService} from "../services/data.service";
import {NtPotentialRegionInterface} from "../shared/interfaces/nt-potential-region.interface";
import {protesUtilityService} from "../services/protes-utility.service";

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  regioniData: NtPotentialRegionInterface[]=[];

  regioniHeatmapData: NtPotentialRegionInterface[]=[];

  public productId = 1;

  public countryId = 10;

  constructor(
    private dataService: DataService,
    private us: protesUtilityService,
  ) {}

  ngOnInit() {
    this.productId = this.us.getSessionVariableNumber('productId')
    this.countryId = this.us.getSessionVariableNumber('countryId')
    this.dataService.getRegioniData(this.productId, this.countryId).subscribe((data: NtPotentialRegionInterface[]) => {
      this.regioniData = data;
    });
    this.dataService.getRegioniHeatmapData(this.productId, this.countryId).subscribe((data: NtPotentialRegionInterface[]) => {
      this.regioniHeatmapData = data;
    });
  }

}
