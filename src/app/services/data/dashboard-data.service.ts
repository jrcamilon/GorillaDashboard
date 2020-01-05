import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Http, Response, Headers } from '@angular/http';
import { environment } from '../../../environments/environment';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class DashboardDataService {

  constructor(private _http: Http) { }

  public getInfoburstTest(): Observable<any> {

    const headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get('http://vm1.infosol.com:3091/infoburst/test', {headers: headers})
    .map((response: Response) => {
      const tmpData = response.json();
      return tmpData;
    });
  }

  public getAllStatsFiltered(monthsArray: any[], yearsArray: any[]): Observable<any> {
    const body = {years_filter: yearsArray, months_filter: monthsArray};
    const headers = new Headers({'Content-Type': 'application/json'});
    return this._http.post('http://vm1.infosol.com:3091/dashboard/totals', body, {headers: headers})
    .map((response: Response) => {
      const tmpData = response.json();
      return tmpData;
    });
  }

  public getBreakDownByMonth(monthsArray: any[], yearsArray: any[], type: string): Observable<any> {
    const body = {years_filter: yearsArray, months_filter: monthsArray, type: type};
    const headers = new Headers({'Content-Type': 'application/json'});
    return this._http.post('http://vm1.infosol.com:3091/dashboard/charts/bymonth', body, {headers: headers})
    .map((response: Response) => {

      const tmpData = response.json();
      return tmpData;
    });
  }

  public getBreakDownByMonthWithDetails(
    monthsArray: any[],
    yearsArray: any[],
    type1: string,
    type2: string,
    type3: string,
    type4: string): Observable<any> {
    const body = {
      years_filter: yearsArray,
      months_filter: monthsArray,
      type1: type1,
      type2: type2,
      type3: type3,
      type4: type4
    };
    const headers = new Headers({'Content-Type': 'application/json'});
    return this._http.post('http://vm1.infosol.com:3091/dashboard/charts/bymonthbreakdown', body, {headers: headers})
    .map((response: Response) => {
      const tmpData = response.json();
      return tmpData;
    });
  }

  public getTableData(monthsArray: any[], yearsArray: any[]): Observable<any> {
    const body = {years_filter: yearsArray, months_filter: monthsArray};
    const headers = new Headers({'Content-Type': 'application/json'});
    return this._http.post('http://vm1.infosol.com:3091/dashboard/table', body, {headers: headers})
    .map((response: Response) => {
      const tmpData = response.json();
      return tmpData;
    });
  }


}
