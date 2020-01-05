import { FIELDS } from './stats-db-fields';
import { DashboardDataService } from './../../services/data/dashboard-data.service';
import { HomePageService } from './../../services/data/home-page.service';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { AuthService } from '../../services/security/auth.service';
import * as global from '../../config/globals';
import * as _ from 'lodash';
import { HomeService } from './home.service';
import { ALL_STATS_DATA,
  MONTHS,
  DASHBOARD_TOTALS,
  PIE_FORMAT,
  KENDO_CHART_DATA_FORMAT,
  KENDO_PACKAGED_FORMAT,
  KENDO_PACKAGED_FORMAT_TWO,
  NET_REVENUE_DASHBOARD,
  REDLIGHT_REVENUE_DASHBOARD } from './data/stats-data';


@Component({
  selector: 'home',
  templateUrl: './home.html',
  styleUrls: [
    '../../../../node_modules/nvd3/build/nv.d3.css',
    '../../../../node_modules/angular-calendar/css/angular-calendar.css',
    '/home.scss'
  ],
  encapsulation: ViewEncapsulation.None
})

export class HomePage implements OnInit {

  public gridData: any[] = ALL_STATS_DATA;

  // public isAuthenticated: boolean;
  public statsAllData: any[];

  public availableMonthsArray: string[] = MONTHS;
  public availableYearsArray: string[] ;
  public selectedYears: string[] = [];
  public selectedMonths: string[] = [];
  public filtersInUse;
  public filteredYears: any[] = [];
  public yearList: string;
  public dashboardTotals: any = DASHBOARD_TOTALS;
  public noticesSent: any = PIE_FORMAT;
  public netRevenueDashboard: any = NET_REVENUE_DASHBOARD;
  public redlightRevenueDashboard: any = REDLIGHT_REVENUE_DASHBOARD;
  public totalPackageRevenue: any = KENDO_CHART_DATA_FORMAT
  public totalPackageTicketsIssued: any = KENDO_PACKAGED_FORMAT;
  public totalFeesPackageChart: any = KENDO_PACKAGED_FORMAT_TWO;

  // Inactive Dashboard list
  public dashboardList_inactive = [
    {id: 5, title: 'Redlight Revenue', class: 'scale-in-center'},
  ];

  // Active Dashboard List feature
  public dashboardList  = [
    {id: 0, title: 'Net Revenue', active: true},
    {id: 1, title: 'Notices Sent', active: true},
    {id: 2, title: 'Issued Tickets', active: true},
    {id: 3, title: 'Fees Paid', active: true},
    {id: 4, title: 'Package Revenue', active: true},
    {id: 5, title: 'Redlight Revenue', active: false},
    {id: 6, title: 'Table View', active: true}
  ];

  constructor(public auth: AuthService, public _dataService: HomePageService, public _homeService: HomeService, public _dashboardDataService: DashboardDataService) {
    // this.auth.isAuthenticated$.subscribe(isAuthenticated => {
    //   this.isAuthenticated = isAuthenticated;
    // });

    // this._dashboardDataService.getInfoburstTest().subscribe(res => {
    //   console.log('INFOBURST', res);
    // })
    /*
    *  Get All the Years Available in the Database, save to availableYearsArray
    *  Nested queries are for setting the rolling years, most recent three years,
    *  stores the filters in use to a service,
    * then gets all the stats users the selected years and available months
    */
    this._dataService.getAllyearsFilters().subscribe(res => {
      this.availableYearsArray = res.map(ele => { return ele.stats_year});
      this.selectedMonths = this.availableMonthsArray;
      this.filteredYears = this._homeService.getRollingNumberYears(this.availableYearsArray, 3);
      this.selectedYears = this.filteredYears;
      this._dataService.filtersInUse.next({months: this.selectedMonths, years: this.selectedYears});
      this.runAllQueries(this.availableMonthsArray, this.selectedYears);

    });
    /*
    *  Get's the stored filters in use from the service
    */
    this._dataService.filtersInUse.subscribe(res => {
      // console.log('FILTERS IN USE',res);
      this.filtersInUse = res;
      this.yearList = this.filtersInUse.years.join(', ');
    });

    /**
     * Removing and adding the fdashboard filter list
     */
    this._homeService.panelToRemove.subscribe(item => {
      // console.log(item);
      const id = item.id;
      //add to inactive list
      this.dashboardList_inactive.push({id: item.id, title: item.title, class: 'scale-in-center'});
      // set as inactive
      for (let i = 0; i < this.dashboardList.length; i++) {
        if (id === this.dashboardList[i].id) {
          this.dashboardList[i].active = false;
        }
      }
      this._homeService.settings.next(this.dashboardList);
    });
    /**
     * Refresing or Reload Button Clicked and run the query for the specified panel
     */
    this._homeService.panelToReload.subscribe(panel => {
      this.runQueryForActiveID(panel.id, this.selectedMonths, this.selectedYears);
    })


  }

  onYearFilterChange(data: any[]) {
    this.selectedYears = data;
    if (data.length > 0) {
      // this._dataService.filtersInUse.next({months: this.selectedMonths, years: this.selectedYears});
      // this.runAllQueries(this.selectedMonths, this.selectedYears);
    } else {
      // Default
      this.selectedYears = this.filteredYears;
      this._dataService.filtersInUse.next({months: this.selectedMonths, years: this.selectedYears});
      this.runAllQueries(this.selectedMonths, this.selectedYears);
    }
  }

  onYearsClose() {
    // console.log('Years closed');
    this._dataService.filtersInUse.next({months: this.selectedMonths, years: this.selectedYears});
    this.runAllQueries(this.selectedMonths, this.selectedYears);
  }

  onMonthFilterChange(data: any[]) {
    this.selectedMonths = data;
    if (data.length > 0) {
      // this._dataService.filtersInUse.next({months: this.selectedMonths, years: this.selectedYears});
      // this.runAllQueries(this.selectedMonths, this.selectedYears);
    } else {
      // Default
      this.selectedMonths = this.availableMonthsArray;
      // console.log(this.selectedYears);
      this._dataService.filtersInUse.next({months: this.selectedMonths, years: this.selectedYears});
      this.runAllQueries(this.selectedMonths, this.selectedYears);
    }
  }

  onMonthsClose() {
    // console.log('Closed Months');
    this._dataService.filtersInUse.next({months: this.selectedMonths, years: this.selectedYears});
    this.runAllQueries(this.selectedMonths, this.selectedYears);
  }

  /**
   * Run ALL THE QUERIES, first run all the quries that are fixed (non dynamic),
   * then for every active dashboard in the dashboardList, run the query and assign
   */
  runAllQueries(monthsFilter: any[], yearsFilter: any[]) {

    // Run all queries that aren't dynamic
    this.getDashboardTotals(monthsFilter, yearsFilter);


    // Find all active dashboard by ID's
    let activeIds = [];
    for (let i = 0; i < this.dashboardList.length; i++) {
      if (this.dashboardList[i].active) {
        activeIds.push(this.dashboardList[i].id);
      }
    }

    // Run queries for all the active ID's
    for (let j = 0; j < activeIds.length; j++) {
      this.runQueryForActiveID(activeIds[j], monthsFilter, yearsFilter);
    }

  }

  runQueryForActiveID(dashboardId: number, monthsFilter: any[], yearsFilter: any[]) {
    switch (dashboardId) {
      case 0: this.getKendoChartNetRevenue(monthsFilter, yearsFilter);
        break;
      case 1: this.getNoticesSentPie(monthsFilter, yearsFilter);
        break;
      case 2: this.getKendoChartTotalTicketsBreakdown(monthsFilter, yearsFilter);
        break;
      case 3: this.getKendoChartTotalPackageFeesBreakDown(monthsFilter, yearsFilter);
        break;
      case 4: this.getKendoChartTotalPackageRevenue(monthsFilter, yearsFilter);
        break;
      case 5: this.getKendoRedlightRevenue(monthsFilter, yearsFilter);
          break;
      case 6: this.getTableData(monthsFilter, yearsFilter);
          break;
    }
  }

  // Request for Data Table Data;
  getTableData(monthsFilter, yearsFilter) {
    // console.log('GETTING DATA TABLE QUERY..');
    this._dashboardDataService.getTableData(monthsFilter, yearsFilter).subscribe(
      (res) => { this.gridData = res; },
      (error) => { console.log(error)},
      () => { this._homeService.isLoading.next(false);});
  }


  // Request for Redlight Dashboard Data
  getKendoRedlightRevenue(monthsFilter: any[], yearsFilter: any[]) {
    // console.log('GETTING REDLIGHT REVENUE QUERY....');
    this._dashboardDataService.getBreakDownByMonth(monthsFilter, yearsFilter, FIELDS.REVENUE_REDLIGHT).subscribe(
      (res) => { this.redlightRevenueDashboard = res;},
      (error) => { console.log(error)},
      () => { this._homeService.isLoading.next(false);});
  }

  // Request for Dashboard Cards Data
  getDashboardTotals(monthsFilter: any[], yearsFilter: any[]) {
    // console.log('GETTING DASHBOARD TOTALS QUERY...');
    this._dashboardDataService.getAllStatsFiltered(monthsFilter, yearsFilter).subscribe(res => {
      this.dashboardTotals = res[0];
    });
  }

  // Request for Notices Sent
  getNoticesSentPie(monthsFilter: any[], yearsFilter: any[]) {
    // console.log('GETTING NOTICES SENT QUERY...')
    this._dashboardDataService.getAllStatsFiltered(monthsFilter, yearsFilter).subscribe(
      (res) => { let response = res[0];
            this.noticesSent = [
              { category: 'Boot & Tow', value: response.notices_boot},
              { category: 'Suspended Registration', value: response.notices_suspended },
              { category: 'Meter Violations', value: response.notices_meter}
            ]},
      (error) => {console.log(error)},
      () => { this._homeService.isLoading.next(false);});
  }

  // Request for Getting Package Revenue
  getKendoChartTotalPackageRevenue(monthsFilter: any[], yearsFilter: any[]) {
    // console.log('GETTING TOTAL PACKAGE REVENUE QUERY...')
    this._dashboardDataService.getBreakDownByMonth(monthsFilter, yearsFilter, FIELDS.REVENUE_TOTAL_PKG).subscribe(
    (res) => {this.totalPackageRevenue = res;},
    (error) => {console.log(error)},
    () => { this._homeService.isLoading.next(false)});
  }

  // Query for Getting Net Revenue
  getKendoChartNetRevenue(monthsFilter: any[], yearsFilter: any[]) {
    // console.log('GETTING NET REVENUE QUERY....');
    this._dashboardDataService.getBreakDownByMonth(monthsFilter, yearsFilter, FIELDS.REVENUE_NET).subscribe(
      (res) => {
        this.netRevenueDashboard = res;
      },
      (err) => { console.log(err) },
      () => { this._homeService.isLoading.next(false) });
  }

  // Request for Total Package Fees
  getKendoChartTotalPackageFeesBreakDown(monthsFilter: any[], yearsFilter: any[]) {
    // console.log('GETTING TOTAL PACKAGE FEES QUERY...');
    this._dashboardDataService.getBreakDownByMonthWithDetails(monthsFilter, yearsFilter, FIELDS.FEE_ATS_RLC, FIELDS.FEE_MARSHAL, FIELDS.FEE_YPA, FIELDS.FEE_COUNTRY_DISABLED_TIX).subscribe(
      (res) => {
          this.totalFeesPackageChart.kendoData = res.kendoData.map(ele =>
              { return {name: this._homeService.cleanForKendoChart(ele.name), data: ele.data};})
          this.totalFeesPackageChart.totalPackage = res.totalPackage;
          this.totalFeesPackageChart.categories = res.categories;
      },
      (error) => { console.log(error)},
      () => { this._homeService.isLoading.next(false)});
  }

  // Request for Total Tickets
  getKendoChartTotalTicketsBreakdown(monthsFilter: any[], yearsFilter: any[]) {
    // console.log('GETTING CHART TOTAL TICKETS BREAKDOWN QUERY...');
    this._dashboardDataService.getBreakDownByMonthWithDetails(monthsFilter, yearsFilter, FIELDS.TICKETS_PEO, FIELDS.TICKETS_OTHER, FIELDS.TICKETS_YPA, FIELDS.TICKETS_YPD).subscribe(
      (res) => {
        this.totalPackageTicketsIssued.kendoData = res.kendoData.map(ele =>
            { return {name: this._homeService.cleanForKendoChart(ele.name), data: ele.data};})
        this.totalPackageTicketsIssued.totalPackage = res.totalPackage;
        this.totalPackageTicketsIssued.categories = res.categories;
      },
      (error) => {console.log(error)},
      () => { this._homeService.isLoading.next(false); });
  }

  onDashboardAddClick(item: any) {
    const id = item.id;
    // Remove Animation
    for (let k = 0; k < this.dashboardList_inactive.length; k++) {
      if (item.id === this.dashboardList_inactive[k].id) {
        this.dashboardList_inactive[k].class = 'scale-out-center';
      }
    }
    setTimeout(() => {
      //remove from inactive list
      if (this.dashboardList_inactive.length > 0) {
        _.remove(this.dashboardList_inactive, {
          id: item.id
        });
      }
      // set as active
      for (let i = 0; i < this.dashboardList.length; i++) {
        if (id === this.dashboardList[i].id) {
          this.dashboardList[i].active = true;
        }
      }
      // run queries
      this.runQueryForActiveID(id, this.selectedMonths, this.selectedYears);

    }, 500);
  }

  ngOnInit() { }

}
