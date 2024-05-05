import { Component, OnInit } from '@angular/core';
import {protesUtilityService} from "../services/protes-utility.service";

@Component({
  selector: 'app-protes-main',
  templateUrl: './protes-main.component.html',
  styleUrls: ['./protes-main.component.scss']
})
export class ProtesMainComponent implements OnInit {

  public national = true;

  public regional = false;

  public regionName : string | null | undefined;

  public sessionRegionName : string | null | undefined;

  public sessionLevel : string | null | undefined;

  public sessionToken = '';

  public region = '';

  constructor(private us : protesUtilityService) { }

  ngOnInit(): void {
    this.sessionToken = sessionStorage.getItem('token') ?? '';
  }

  gestisciEventoRegional(dato: string) {
    this.sessionRegionName = this.us.getSessionVariableString('regionName');
    if (this.sessionRegionName != null){
      this.region = this.sessionRegionName;
      console.log(this.region)
    }
    this.sessionLevel = sessionStorage.getItem('level');
    if (this.sessionLevel != 'regional'){
      if(this.sessionRegionName != this.regionName){
        console.log(this.sessionRegionName,this.regionName);
        if (!this.regional){
          this.regional = !this.regional;
          this.national = !this.national;
        }
      }
      this.regionName = this.sessionRegionName;
    }else{
      if (!this.regional){
        this.regional = !this.regional;
        this.national = !this.national;
      }
      this.regionName = this.sessionRegionName;
      console.log(dato);
    }
  }

  gestisciEventoNational(dato: string) {
      if (!this.national){
        this.regional = !this.regional;
        this.national = !this.national;
      }
    console.log(dato);
  }

  setToken(token: string) {
    this.sessionToken = token;
    sessionStorage.setItem('token', token);
  }

}
