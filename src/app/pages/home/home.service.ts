import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Http, Response, Headers } from '@angular/http';

import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  public panelToRemove = new Subject<any>();
  public panelToReload = new Subject<any>();
  public isLoading = new BehaviorSubject<any>(true);
  public settings = new Subject<any>();

  constructor() { }

  getRollingNumberYears(years: any[], filterLength: number) {
    let newArr: string[] = [];
    if (filterLength >= years.length) {
      newArr = years;
    } else {
      newArr = years.slice(Math.max(years.length - filterLength, 1))
    }
    return newArr;
  }

  cleanForKendoChart(type: string) {
    switch(type) {
      case 'net_revenue':
          return 'Net Revenue';
      case 'total_revenue':
          return 'Total Revenue'
      case 'county_disabled_tix_fee':
          return 'County Disabled';
      case 'ypa_fee':
          return 'YPA';
      case 'marshal':
          return 'Marshal';
      case 'ats_rlc_fee':
          return 'ATS RLC';
      case 'total_pkg_revenue':
          return 'Package Revenue'
      case 'total_redlight_camera_rev':
          return 'Redlight Revenue';
      case 'total_code_enf_rev':
          return 'Code ENF Revenue';
      case 'total_code_enf_rev_courts':
          return 'Code ENF Revenue Courts';
      case 'total_pkg_issued':
          return 'Total Package Issued';
      case 'issued_peo':
          return 'PEO';
      case 'issued_ypd':
          return 'YPD';
      case 'issued_ypa':
          return 'YPD';
      case 'issued_other':
          return 'OTHER';
      case 'totaltix_rlc':
          return 'RLC';
      case 'totaltix_code':
          return 'CODE';
      case 'late_notices_sent':
          return 'Notices Sent';
      case 'boot_tow':
          return 'Boot & Tow';
      case 'susp_reg':
          return 'Suspended Reg';
      case 'meter_violation':
          return 'Meter Violation';
      default:
          return '';
    }
  }

}

