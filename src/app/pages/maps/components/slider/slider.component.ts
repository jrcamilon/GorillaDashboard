/**
 * Component for the slider toolbar in the bottom of maps, accepts input data as parameters
 * and outputs a slider change event
 */

import { Component, OnInit, NgZone, AfterViewInit, OnDestroy, Input, Output, EventEmitter, ElementRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
// import { Observable } from 'rxjs';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit, AfterViewInit, OnDestroy {

  private chart: am4charts.XYChart;
  @ViewChild("chart")
  private chartDom: ElementRef;
  @Input() data: any[];
  @Output() sliderChange : EventEmitter<any> = new EventEmitter();

  constructor(private zone: NgZone) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {

      if (this.data == null || this.data.length === 0) {
        this.chart.dispose();
      }
  
      var chart = am4core.create(this.chartDom.nativeElement, am4charts.XYChart);
      chart.data = this.data;
    
      let dateAxis = chart.xAxes.push(new am4charts.DateAxis() as any);

      dateAxis.dataFields.category = "Date";
      chart.xAxes.push(dateAxis);
      
      dateAxis.renderer.grid.template.location = 0.5;
      dateAxis.dateFormatter.inputDateFormat = "yyyy-MM-dd";
      dateAxis.renderer.minGridDistance = 50;

      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis() as any);

      var series = chart.series.push(new am4charts.LineSeries() as any);
      series.dataFields.valueY = "value";
      series.dataFields.value = "id";
      series.dataFields.dateX = "date";
      series.strokeWidth = 2
      series.strokeOpacity = 0.3;

      let scrollbarX = new am4charts.XYChartScrollbar();
        scrollbarX.background.fill = am4core.color("#dc67ab");
        scrollbarX.background.fillOpacity = 0.2;

        scrollbarX.thumb.background.fill = am4core.color("#67dcab");
        scrollbarX.thumb.background.fillOpacity = 0.2;

        scrollbarX.stroke = am4core.color("white");

      scrollbarX.series.push(series);
      chart.scrollbarX = scrollbarX;
      // console.log(scrollbarX);
      chart.plotContainer.visible = false;
      chart.leftAxesContainer.visible = false;
      chart.rightAxesContainer.visible = false;
      chart.bottomAxesContainer.visible = false;
      chart.padding(0, 15, 0, 15);
      // console.log(chart.scrollbarX);

      


      // Listen for change in scroll thumb
      scrollbarX.events.onAll(ev => {
        if (ev === 'rangechanged') {
          this.sliderMovementChange(scrollbarX);
        }
      });
    });
  }

  sliderMovementChange(change: any) {
    this.sliderChange.emit(change);
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
 
}
