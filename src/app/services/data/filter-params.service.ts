import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Http, Response, Headers } from '@angular/http';
import { environment } from '../../../environments/environment';

import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class FilterParamsService {

  constructor(private _http: Http) { }

  public getAllSiteId(): Observable<any> {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get('http://vm1.infosol.com:3091/siteids', {headers: headers})
    .map((response: Response) => {
      const tmpData = response.json();
      return tmpData;
    });
  }

  public getAllDistinctStreets(_street: any): Observable<any> {
    const headers = new Headers({'Content-Type': 'application/json'});
    const body = {street: _street };
    return this._http.post('http://vm1.infosol.com:3091/streets', body, {headers: headers})
    .map((response: Response) => {
      const tmpData = response.json();
      return tmpData;
    });
  }




}
