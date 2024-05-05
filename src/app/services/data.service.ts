import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {NtPotentialRegionInterface} from "../shared/interfaces/nt-potential-region.interface";
import {RgGeneralInfoInterface} from "../shared/interfaces/rg-general-info.interface";
import {RgOutletInterface} from "../shared/interfaces/rg-outlet-info.interface";
import {RgUpdateHeatmapInterface} from "../shared/interfaces/rg-update-heatmap.interface";
import {environment} from "../../environments/environment";
import {Credential} from "../shared/interfaces/credential";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private AUTH_URL = environment.authUrl;
  private URL = environment.baseUrl;

  private signInRequest = '/auth/sign-in';

  private jsonNationalUrl = '/sales/potential';

  private jsonNationalHeatmapUrl = '/sales/heatmap';

  private jsonGeneralInfoUrl = '/sales/regional';

  private jsonInclusionProcessUrl = '/inclusion-process';

  private jsonInclusionProcessStepUrl = '/sales/regional/inclusion-process';

  private jsonInclusionProcessStepTargetUrl = '/sales/coverage/target/update';

  private jsonInclusionProcessStepTargetSellUrl = '/sales/sell/target/update';

  private jsonInclusionProcessStepActualUrl = '/sales/coverage/actual/update';

  private jsonRegionalOutletUrl = '/sales/regional/outlets';

  private jsonActivityListUrl = '/activity';

  private jsonNationalChartUrl = '/sales/coverage/line-chart';

  private jsonNationalMarketChartUrl = '/sales/sell/line-chart';

  private jsonUpdateHeatmapUrl = '/sales/sell/heatmap/update'

  constructor(private http: HttpClient) {}

  private header = {
    headers: new HttpHeaders().set('Authorization', sessionStorage.getItem('token') ?? '')
      .set('Access-Control-Allow-Origin', 'origin')
      .set('Access-Control-Allow-Methods', 'OPTIONS,POST,GET')
      .set('Access-Control-Allow-Headers', 'Content-Type')
  }

  // TODO: capire come rimuovere il tipo any
  login(username: string, password: string): Observable<Credential> {
    return this.postRequest(this.AUTH_URL + this.signInRequest, {username, password});
  }

  getRegioniData(productId: number, countryId: number): Observable<NtPotentialRegionInterface[]> | any {
    return this.getRequest(this.URL + this.jsonNationalUrl + '/' + productId + '/' + countryId);
  }

  getRegioniHeatmapData(productId: number, countryId: number): Observable<NtPotentialRegionInterface[]> | any {
    return this.getRequest(this.URL + this.jsonNationalHeatmapUrl + '/' + productId + '/' + countryId);
  }

  updateHeatmap(data: RgUpdateHeatmapInterface) {
    return this.postRequest(this.URL + this.jsonUpdateHeatmapUrl, data);
  }

  // TODO: capire come rimuovere il tipo any
  getGeneralInfoData(productId: number, countryId: number, regionId: number):
    Observable<RgGeneralInfoInterface | any> {
    return this.getRequest(this.URL + this.jsonGeneralInfoUrl + '/' + productId + '/' + countryId + '/' + regionId);
  }
  updateGeneralInfoData(productId: number, countryId: number, regionId: number, data: any):
    Observable<any> {
    return this.postRequest(this.URL + this.jsonGeneralInfoUrl + '/' + productId + '/' + countryId + '/' + regionId + '/update', data);
  }

  getOutletInfoData(productId: number, countryId: number, regionId: number):
    Observable<RgOutletInterface | any> {
    return this.getRequest(this.URL + this.jsonRegionalOutletUrl + '/' + productId + '/' + countryId + '/' + regionId);
  }

  updateOutletInfoData(productId: number, countryId: number, regionId: number, data: any):
    Observable<any> {
    return this.postRequest(this.URL + this.jsonRegionalOutletUrl + '/' + productId + '/' + countryId + '/' + regionId + '/upsert', data);
  }

  importOutletFromExcel(productId: number, regionId: number, data: any):
    Observable<any> {
    return this.postRequest(this.URL + this.jsonRegionalOutletUrl + '/import?productId=' + productId + '&regionId=' + regionId, data);
  }

  getInclusionProcessData(productId: number, countryId:number, regionId: number, outletOnekey: string): Observable<any> {
    return this.getRequest(this.URL + this.jsonGeneralInfoUrl + this.jsonInclusionProcessUrl + '/' + productId + '/' + countryId + '/' + regionId + '/' + outletOnekey + '/steps');
  }

  updateInclusionProcessData(productId: number, countryId:number, regionId: number, outletOnekey: string,  data: any):
    Observable<any> {
    return this.postRequest(this.URL + this.jsonInclusionProcessStepUrl + '/' + productId + '/' + countryId + '/' + regionId + '/' + outletOnekey + '/update', data);
  }

  updateTargetCoverageData(data: any):
    Observable<any> {
    return this.postRequest(this.URL + this.jsonInclusionProcessStepTargetUrl, data);
  }

  updateTargetSellData(data: any):
    Observable<any> {
    return this.postRequest(this.URL + this.jsonInclusionProcessStepTargetSellUrl, data);
  }

  updateActualCoverageData(data: any):
    Observable<any> {
    return this.postRequest(this.URL + this.jsonInclusionProcessStepActualUrl, data);
  }

  getSupportActivityData(productId: number, countryId: number, regionId: number): Observable<any> {
    return this.getRequest(this.URL + this.jsonActivityListUrl + '/' + productId + '/' + countryId + '/' + regionId);
  }

  importActivitiesFromList(productId: number, countryId: number, regionId: number, data: any): Observable<any> {
    return this.postRequest(this.URL + this.jsonActivityListUrl + '/' + productId + '/' + countryId + '/' + regionId + '/import', data);
  }

  updateActivityInActivityPlan(productId: number, countryId: number, regionId: number, data: any): Observable<any> {
    return this.postRequest(this.URL + this.jsonActivityListUrl + '/' + productId + '/' + countryId + '/' + regionId + '/update', data);
  }

  getRegionalActivityList(): Observable<any> {
    return this.getRequest(this.URL + this.jsonActivityListUrl);
  }

  getNationalChart(productId: number, countryId: number): Observable<any> {
    return this.getRequest(this.URL + this.jsonNationalChartUrl + '/' + productId + '/' + countryId);
  }

  getNationalMarketChart(productId: number, countryId: number): Observable<any> {
    return this.getRequest(this.URL + this.jsonNationalMarketChartUrl + '/' + productId + '/' + countryId);
  }

  getRequest(url: string): Observable<any> {
    let token = 'test';

    if (sessionStorage.getItem('token') && sessionStorage.getItem('token') != '') {
      // @ts-ignore
      token = sessionStorage.getItem('token');
    }

    if (this.header.headers.get('Authorization') == '') {
      this.header.headers = this.header.headers.set('Authorization', token);
    }

    return this.http.get(url, this.header);
  }

  postRequest(url: string, body: any): Observable<any> {
    if (this.header.headers.get('Authorization') == '') {
      this.header.headers.append('Authorization', sessionStorage.getItem('token') ?? '');
      this.header.headers.append('Access-Control-Allow-Origin', 'origin');
    }

    return this.http.post(url, body, this.header);
  }
}
