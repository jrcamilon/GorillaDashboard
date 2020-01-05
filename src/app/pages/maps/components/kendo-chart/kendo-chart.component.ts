import { Component, OnInit, Input } from '@angular/core';
import { ValueAxisLabels } from '@progress/kendo-angular-charts';
import * as GLOBAL from '../../../../config/globals';
import { KendoChartService } from './kendo-chart.service';

@Component({
  selector: 'app-kendo-chart',
  templateUrl: './kendo-chart.component.html',
  styleUrls: ['./kendo-chart.component.css']
})
export class KendoChartComponent implements OnInit {

  @Input() series: any[];
  @Input() categories: number[];
  @Input() chartType: any;

  @Input() dataType: string;
  @Input() height: number;

  public expanded = false;
  public usedHeight: number;

  constructor(public _chartService: KendoChartService) {

    this._chartService.expandedPanel.subscribe(res => {
     this.expanded = res;
      this.setHeight();
    });
   }

  setHeight() {
    if (this.expanded) {
      this.usedHeight = window.innerHeight - 300;
    } else {
      this.usedHeight = this.height;
    }
  }

  ngOnInit() {
    this.usedHeight = this.height;
  }

  getColor(type: any) {
    if (type === 'Paid') {
      return GLOBAL.COLOR_GREEN_DARKER;
    } else if (type === 'Issued') {
      return GLOBAL.COLOR_RED_DARKER;
    } else if (type === 'Total Earnings') {
      return '#27ae5f';
    }
  }

  getTooltip(value: any) {
    return value + ' ' + 'Tickets';
  }

  labelContent = ( e: any) => {
    let value = e.value;
    let returnValue: string;

    if (value < 1000 && value < 999999) {
      returnValue =   value.toString();
    } else if (value < 999999 && value < 9999999) {
      value = value / 1000;
      returnValue =   (value.toString() + 'K');
    } else if (value < 9999999 && 99999999) {
      value = value / 1000000;
      returnValue = (value.toString() + 'M');
    }

    return returnValue;

  }

  labelContentMoney = ( e: any) => {
    let value = e.value;
    let returnValue: string;

    if (value < 1000 && value < 999999) {
      returnValue =  '$' + value.toString();
    } else if (value < 999999 && value < 9999999) {
      value = value / 1000;
      returnValue =  '$' + (value.toString() + 'K');
    } else if (value < 9999999 && 99999999) {
      value = value / 1000000;
      returnValue = '$' + (value.toString() + 'M');
    }

    return returnValue;

  }

}


