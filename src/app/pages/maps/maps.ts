import { TICKET_COST, ATS_PERCENTAGE, ATS_FEE } from './../../config/yonkers-settings';
import { DataTableService } from './components/data-table/data-table.service';
import { FilterParamsService } from './../../services/data/filter-params.service';
import { mapStylesDark } from './../../config/map-config';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/security/auth.service';
import { DataService } from '../../services/data/data.service';
import pageSettings from '../../config/page-settings';
import { RWANDA_BOUNDARY } from './boundary';
import { MapsService } from './maps.service';
import * as _ from 'lodash';
declare var google;

@Component({
  selector: 'maps',
  templateUrl: './maps.html',
  styleUrls: ['./maps.scss']
})

export class MapsPage implements OnInit, OnDestroy {

  public pageSettings = pageSettings;
  public markers = [  {lat: -1.5161525, lng: 29.446403} ];
  public cameraData: any;
  public mapStyles = mapStylesDark;
  public mapInstance: any;
  
  public isViewDetailsDialogVisible: boolean;
  public viewDetailsTitle: string = 'title';
  public listItems: Array<string> = [];
  public listLabels: Array<string> = ['NOON', 'NEST'];
  public sliderData: any[] = [];

  public isBoundaryOverlay: boolean = true;
  public isheatmapPaidOverlay: boolean = false;
  public isTotalRevenueViewDetails: boolean = false;
  public isHeatmapRevenueOverlay: boolean = false;
  public isMarkersVisible: boolean = true;

  public rwandaBoundaryLayer: any;
  public toggle = false;

  public heatmapRevenue: any;
  public heatmapLocations: any;
  public heatmapLocations2: any;

  public heatmapPaid: any;
  public data: any[];
  public slider: any = null;

  public area: string[] = ['',''];
  public playState: boolean  = false;   
  public interval: any;     
  

  lat: number;
  lng: number;

  group: string[];
  label: string;
  startDate: Date;
  endDate: Date;

  public value: Date = new Date(1999, 1, 1);

  groups: any[] = [];

  displayStartDate: string;
  displayEndDate: string;


  selectedGroups: any[] = [];
  selectedLabel: string = null;
  selectedStartDate: string = null;
  selectedEndDate: string = null;

  groupsLayersArray = [];

  public min: number = 0;
  public max: number = 26;
  public smallStep: number = 1;
  public valueHorizontal: number = 0;

  // Play Button
  public playButtonState: boolean = false;

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.pageSettings.pageContentFullWidth = false;
    this.pageSettings.pageContentInverseMode = false;
  }

  constructor (
    public auth: AuthService,
    public _dataService: DataService,
    public _dataTable: DataTableService,
    public _paramsService: FilterParamsService,
    public _mapsService: MapsService) {

    this.pageSettings.pageContentFullWidth = true;
    this.pageSettings.pageContentInverseMode = true;

    this._dataService.getRangingGroups().subscribe(res => {
      this.groups = res;

      this.listItems = this.groups.map(ele => {
        return ele.groupin;
      });
      // console.log(this.listItems);
      this.listItems = this.listItems.filter(ele => {
        return ele === 'PAB' || ele === 'TIT'
      })
      this.getRanginRecords();
    });
  }

  onPlayButtonPressed() {
    if (this.slider.end < 1) {
      this.playButtonState = !this.playButtonState;
    }


    if (this.playButtonState) {
      this.play();
    } else {
      this.stop();
    }
  }

  play() {

    this.interval = setInterval(() => {
      this.slider.start = this.slider.start + 0.01;
      this.slider.end = this.slider.end + 0.01;
      console.log('start, end', this.slider.start, this.slider.end);
      this.drawMap(this.slider)
    }, 700);
  }

  stop() {
    clearInterval(this.interval);
  }

  

  onSliderChange(e: any) {
    this.slider = e;
    this.drawMap(this.slider);
  }

  drawMap(e) {

    if (this.slider.end >= 1) {
      this.playButtonState = !this.playButtonState
      this.stop();
    }


    const arrLength = this.sliderData.length;
    const startId = Math.round(arrLength * e.start);
    const endId = Math.round(arrLength * e.end);
    const range = [];
    for (let i = startId; i < endId; i++) {
      const element = this.data[i];
      range.push(element);
    }

    const pab = range.map(ele => {
      if (ele.groupin === 'PAB') {
        return ele
      }
    }).filter(item => {return item !== undefined});

    const tit = range.map(ele => {
      if (ele.groupin === 'TIT') {
        return ele
      }
    }).filter(item => {return item !== undefined});

    this.setDisplayDates(range);

    const pabRange = pab.map(ele => { return new google.maps.LatLng(ele.lat, ele.lng);});
    this.heatmapLocations.setMap(null);
    let x = new google.maps.visualization.HeatmapLayer({ data: pabRange }); 
    this.heatmapLocations = x; 
    this.heatmapLocations.setMap(this.mapInstance);

    const titRange = tit.map(ele => { return new google.maps.LatLng(ele.lat, ele.lng);});
    this.heatmapLocations2.setMap(null);
    let y = new google.maps.visualization.HeatmapLayer({ data: titRange }); 
    this.heatmapLocations2 = y; 
    this.heatmapLocations2.setMap(this.mapInstance);

    this.area = [];

    // computer area
    if (pabRange){
      let pabArea = google.maps.geometry.spherical.computeArea( pabRange );
      let _area = parseFloat((pabArea/(1000*1000)).toFixed(2));
      if (_area > 0) {
        this.area.push('Pablo Range: ' + (pabArea/(1000*1000)).toFixed(2) + ' sq km');
      }
    }

    if (titRange){
      let titArea = google.maps.geometry.spherical.computeArea( titRange );
      let _area = parseFloat((titArea/(1000*1000)).toFixed(2));
      if (_area > 0) {
        this.area.push('Titus Range: ' + (titArea/(1000*1000)).toFixed(2) + ' sq km');
      }

    }


  }

  setDisplayDates(range: any[]) {
    this.displayStartDate = new Date(range[0].datein).toLocaleDateString();
    this.displayEndDate = new Date(range[range.length - 1].datein).toLocaleDateString();
  }

  setGradient(heatmapLocations: any) {
    let gradient = [
      'rgba(0, 255, 255, 0)',
      'rgba(0, 255, 255, 1)',
      'rgba(0, 191, 255, 1)',
      'rgba(0, 127, 255, 1)',
      'rgba(0, 63, 255, 1)',
      'rgba(0, 0, 255, 1)',
      'rgba(0, 0, 223, 1)',
      'rgba(0, 0, 191, 1)',
      'rgba(0, 0, 159, 1)',
      'rgba(0, 0, 127, 1)',
      'rgba(63, 0, 91, 1)',
      'rgba(127, 0, 63, 1)',
      'rgba(191, 0, 31, 1)',
      'rgba(255, 0, 0, 1)'
    ]; heatmapLocations.set('gradient', gradient);
    // this.modulateGradient(gradient, heatmapLocations);
  }

  modulateGradient(gradient: any, heatmap: any) {
    var gradient, gradientStep = -1;
    var modulator = function() {
        var newGradient = gradient.slice(0, heatmap.get('gradient').length + gradientStep);
        if (newGradient.length == gradient.length || newGradient.length == 7) {
            gradientStep *= -1;
        }
        heatmap.set('gradient', newGradient);
        setTimeout(modulator, 100);
    };
    setTimeout(modulator, 100);
  }

  getRanginRecords() {
    this.sliderData = [];
    const start = new Date(this.selectedStartDate).toISOString();
    const end = new Date(this.selectedEndDate).toISOString();

    if (this.selectedGroups.length !== 0 && 
      this.selectedLabel !== null && 
      this.selectedStartDate !== null &&
      this.selectedEndDate !== null) {
        const params = {
          group: this.selectedGroups,
          label: this.selectedLabel,
          startDate: start,
          endDate: end
        };
        this._dataService.getRangingRecords(params).subscribe(res => {
          this.processForSlider(res);
          this.processMapRecords(res);
          this.max = this.daysBetween(this.selectedStartDate, this.selectedEndDate);
        });
    } else {
      this.heatmapLocations.setMap(null);
      this.heatmapLocations2.setMap(null);
    }
  }

  processForSlider(res: any[]) {
    this.data = res;
    this.sliderData = res.map((ele, index) => {
      return {id: index, date: ele.datein, value: 0 }
    });
  }

  processMapRecords(res: any[]) { }

  sortObject(o) {
      return Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {});
  }

  groupByMonthWeek(data) {
    return data.reduce((acc, obj) => {
      var [y, m, d] = obj.datein.split(/\D/);
      [y, m, '0'+ Math.ceil(d/7)].reduce((a,v,i) => a[v] || (a[v] = i < 2 ? {} : []), acc).push(obj);
      return acc;
    }, Object.create(null));
  }

  onMapReady(mapInstance: any): void {

    this.mapInstance = mapInstance;

    // Initialize polygon layer
    let rwandaCoords = RWANDA_BOUNDARY.map(ele => { return {lat: ele[1], lng: ele[0]}; });
    this.rwandaBoundaryLayer = new google.maps.Polygon({
      paths: rwandaCoords,
      strokeColor: '#e74d3c',
      strokeOpacity: 0.8,
      strokeWeight: 1.2,
      fillColor: '#e74d3c',
      fillOpacity: 0.20
    });

    this.rwandaBoundaryLayer.setMap(this.mapInstance);

    // heatmap revenue
    this.heatmapLocations = new google.maps.visualization.HeatmapLayer({ data: [] });
    this.heatmapLocations.setMap(this.mapInstance);

    this.heatmapLocations2 = new google.maps.visualization.HeatmapLayer({ data: [] });
    this.heatmapLocations2.setMap(this.mapInstance);



  }

  onGroupsValueChange(selectedGroups: string[]) {
    this.area = [];
    this.selectedGroups = selectedGroups;
    this.getRanginRecords();
  }

  onLabelValueChange(selectedLabel: any) {
    this.selectedLabel = selectedLabel;
    this.getRanginRecords();
  }

  onStartDateChange(e: any) {
    this.selectedStartDate = e;
    this.getRanginRecords();
  }

  onEndDateChange(e: any) {
    this.selectedEndDate = e;
    this.getRanginRecords();
  }

  markerIconUrl(marker: any) {
    return this._mapsService.getCustomMarker(marker);
  }

  onOptionsClick() {
    this.toggle = !this.toggle;
  }

  daysBetween ( date1, date2 ) {
    //Get 1 day in milliseconds
    var one_day = 1000 * 60 * 60 * 24;
  
    // Convert both dates to milliseconds
    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();
  
    // Calculate the difference in milliseconds
    var difference_ms = date2_ms - date1_ms;
      
    // Convert back to days and return
    return Math.round(difference_ms/one_day); 
  }

  onTrafficCamClick(type: string) {
    switch (type) {
      case 'traffic':

        break;
      case 'boundary':
          if (!this.isBoundaryOverlay) {
            this.isBoundaryOverlay = true;
            this.rwandaBoundaryLayer.setMap(this.mapInstance);
          } else {
            this.isBoundaryOverlay = false;
            this.rwandaBoundaryLayer.setMap(null);
          }
        break;
      case 'heatmap-revenue':

      case 'heatmap-paid':

        break;
      case 'markers':
        if (!this.isMarkersVisible) {
          this.isMarkersVisible = true;
        } else {
          this.isMarkersVisible = false;
        }
      break;

    }
  }

}
