import { KendoChartService } from './../../pages/maps/components/kendo-chart/kendo-chart.service';
import { Component, ViewChild, AfterViewInit, Input } 		 from '@angular/core';
import { HomeService } from '../../pages/home/home.service';

@Component({
  selector: 'panel',
  inputs: ['title', 'variant', 'noBody', 'noButton', 'bodyClass', 'footerClass', 'panelClass'],
  templateUrl: './panel.component.html'
})

export class PanelComponent implements AfterViewInit {

  @Input() dashId: string;
  @ViewChild('panelFooter') panelFooter;
  expand = false;
  reload = false;
  collapse = false;
  remove = false;
  showFooter = false;

  constructor(public _chartService: KendoChartService, public _homeService: HomeService) {
    // this._homeService.isLoading.subscribe(res => {
    //   console.log('IS LOADING', res);
    // })
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.showFooter = this.panelFooter.nativeElement && this.panelFooter.nativeElement.children.length > 0;
    });
  }
  panelExpand() {
    this.expand = !this.expand;
    this._chartService.expandedPanel.next(this.expand);
  }
  panelReload() {

    this.reload = true;
    this._homeService.panelToReload.next(this.dashId);

    setTimeout(() => {
      this._homeService.isLoading.subscribe(isLoading => {
        this.reload = isLoading;
      })
    }, 1500);
  }
  panelCollapse() {
    this.collapse = !this.collapse;
  }
  panelRemove() {
    this._homeService.panelToRemove.next(this.dashId);
    this.remove = !this.remove;
  }
}
