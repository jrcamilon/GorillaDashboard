import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';


declare var google;

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  public cameraData = new Subject<any>();
  public comparissonTable = new Subject<any>();

  constructor() { }

  public getCustomMarker(markerOb: any) {
    const markerStatus = markerOb.status
    const constructionStatus = markerOb.construction;

    let markerUrl = '';

    if (markerStatus === 'ON') {
       markerUrl = 'assets/img/camera_on.png';
    }
    if (markerStatus === 'OFF') {
       markerUrl = 'assets/img/camera_off.png';
    }
    if (constructionStatus === 1) {
      // console.log(markerOb.site_id);
       markerUrl = 'assets/img/camera_uc.png';
    }

    return markerUrl;
  }
}
