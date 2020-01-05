import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Http, Response, Headers } from '@angular/http';

import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class KendoChartService {

  public expandedPanel = new BehaviorSubject<any>(false);

  constructor() { }

}

