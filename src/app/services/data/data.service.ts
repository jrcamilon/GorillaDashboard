import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Http, Response, Headers } from '@angular/http';
import { environment } from '../../../environments/environment';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public apiConnectionStatus = new Subject<any>();
  public comparissonTable = new Subject<any>();

  constructor(private _http: Http) { }

  public heartbeat(): Observable<any> {
    return this._http.get('http://vm1.infosol.com:3091/heartbeat')
    .map((response: Response) => {
      const tmpData = response.json();
      return tmpData;
    });
  }

  public getRangingRecords(params: any): Observable<any> {
    const body = {
      group: params.group,
      label: params.label,
      startDate: params.startDate,
      endDate: params.endDate
    };
    const headers = new Headers({'Content-Type': 'application/json'});
    return this._http.post('http://vm1.infosol.com:3093/test2', body, {headers: headers})
    .map((response: Response) => {
      const tmpData = response.json();
      return tmpData;
    });
  }

  public getRangingGroups(): Observable<any> {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get('http://vm1.infosol.com:3093/groups', {headers: headers})
    .map((response: Response) => {
      const tmpData = response.json();
      return tmpData;
    });
  }

  public getAllTrafficCamsByID(_id_array: any[]): Observable<any> {
    const body = {site_id_list: _id_array };
    const headers = new Headers({'Content-Type': 'application/json'});
    return this._http.post('http://vm1.infosol.com:3091/allcamsbyid', body, {headers: headers})
    .map((response: Response) => {
      const tmpData = response.json();
      return tmpData;
    });
  }

  public getPaymentsForCam(_siteId: any): Observable<any> {
    const body = {site_id: _siteId };
    const headers = new Headers({'Content-Type': 'application/json'});
    return this._http.post('http://vm1.infosol.com:3091/payments', body, {headers: headers})
    .map((response: Response) => {
      const tmpData = response.json();
      return tmpData;
    });
  }

  public getComparissonTable(_id_array: any): Observable<any> {

    const body = {site_id_list: _id_array };
    const headers = new Headers({'Content-Type': 'application/json'});
    return this._http.post('http://vm1.infosol.com:3091/compare', body, {headers: headers})
    .map((response: Response) => {
      const tmpData = response.json();
      return tmpData;
    });
  }

  public getViewDetailsRevenue(_id_array: any): Observable<any> {

    const body = {site_id_list: _id_array };
    const headers = new Headers({'Content-Type': 'application/json'});
    return this._http.post('http://vm1.infosol.com:3091/viewdetails/revenue', body, {headers: headers})
    .map((response: Response) => {
      const tmpData = response.json();
      return tmpData;
    });
  }


}
