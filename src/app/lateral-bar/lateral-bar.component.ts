import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataService} from "../services/data.service";
import {NtPotentialRegionInterface} from "../shared/interfaces/nt-potential-region.interface";
import {protesUtilityService} from "../services/protes-utility.service";

@Component({
  selector: 'app-lateral-bar',
  templateUrl: './lateral-bar.component.html',
  styleUrls: ['./lateral-bar.component.scss']
})
export class LateralBarComponent implements OnInit {

  @Input() national= 'true';

  regioniData: NtPotentialRegionInterface[]=[];

  public regionId = 1;

  public productId = 1;

  public countryId = 10;

  public viewRegioni = false;

  public viewBottonUp = false;

  public viewBottonDown = true;

  public viewBottonLeft = false;

  public regionaName = '';

  public nationName : string | null | undefined;

  public sessionLevel : string | null | undefined;

  private username = '';
  private sessionToken = '';

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

    if (sessionStorage.getItem('username')) {
      this.username = sessionStorage.getItem('username') ?? '';
    }

    if (sessionStorage.getItem('token')) {
      this.sessionToken = sessionStorage.getItem('token') ?? '';
    }

    sessionStorage.clear();
    sessionStorage.setItem('level', 'national');
    sessionStorage.setItem('nationName', 'Italia');
    sessionStorage.setItem('productId', '1');
    sessionStorage.setItem('countryId', '1');
    sessionStorage.setItem('username', this.username);
    sessionStorage.setItem('token', this.sessionToken);
  }

  public showRegioni(){
    this.sessionLevel = sessionStorage.getItem('level');
    if (this.sessionLevel == 'national'){
      this.viewRegioni = !this.viewRegioni;
      this.viewBottonUp = !this.viewBottonUp;
      this.viewBottonDown = !this.viewBottonDown;
    }else{
      this.viewBottonLeft = false;
      this.viewBottonUp = true;
      this.viewBottonDown = false;
      this.nationName = sessionStorage.getItem('nationName');
      this.goToNational(this.nationName)
    }
  }

  @Output() regionalTrue = new EventEmitter<string>();

  @Output() nationalTrue = new EventEmitter<string>();

  goToRegional(regione: string, regionId: string) {
    this.sessionLevel = sessionStorage.getItem('level');
    this.regionaName = regione;
    this.viewBottonLeft = true;
    this.viewBottonUp = false;
    this.viewBottonDown = false;
    if (this.sessionLevel == 'regional'){
      sessionStorage.setItem('regionName', this.regionaName);
      sessionStorage.setItem('regionId', regionId);
      sessionStorage.setItem('outletOnekey', '');
      console.log(this.regionaName)
      this.regionalTrue.emit('200 OK');
    }
    sessionStorage.setItem('regionName', this.regionaName);
    sessionStorage.setItem('regionId', regionId);
    sessionStorage.setItem('level', 'regional');
    this.regionalTrue.emit('200 OK');
  }

  goToNational(nation: string | null) {
    this.nationName = nation;
    this.viewBottonLeft = false;
    this.viewBottonUp = true;
    this.viewBottonDown = false;
    sessionStorage.setItem('level', 'national');
    this.nationalTrue.emit('200 OK');
  }

  onSettings(){
      alert('Settings available from version 2!')
  }

}
