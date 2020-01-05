import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class DataTableService {

  public selectedMarkers = new Subject<any>();


constructor() { }

convertDataTable(data: any[]) {
  return data.map(ele => {
    return new Object({
      collection_rate: ele.collection_rate,
      direction_short: ele.direction_short,
      issued: ele.issued,
      paid: ele.issued,
      site_id: ele.site_id,
      status: ele.status,
      total_earnings: ele.total_earnings
    })
  });
}




}
