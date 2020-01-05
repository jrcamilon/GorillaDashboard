// Imports
import { environment }                            from '../environments/environment';

// Core Module
import { Router, NavigationEnd, ActivatedRoute }  from '@angular/router';
import { HttpModule }                             from '@angular/http';

import { BrowserAnimationsModule }                from '@angular/platform-browser/animations';
import { BrowserModule, Title }                   from '@angular/platform-browser';
import { AppRoutingModule }                       from './app-routing.module';
import { NgbModule }                              from '@ng-bootstrap/ng-bootstrap';
import { NgModule }                               from '@angular/core';
import { FormsModule, ReactiveFormsModule }       from '@angular/forms';
import * as global                                from './config/globals';

import { GridModule }                             from '@progress/kendo-angular-grid';
import { DropDownsModule }                        from '@progress/kendo-angular-dropdowns';

// Main Component
import { AppComponent }                           from './app.component';
import { HeaderComponent }                        from './components/header/header.component';
import { SidebarComponent }                       from './components/sidebar/sidebar.component';
import { SidebarRightComponent }                  from './components/sidebar-right/sidebar-right.component';
import { TopMenuComponent }                       from './components/top-menu/top-menu.component';
import { FooterComponent }                        from './components/footer/footer.component';
import { PanelComponent }                         from './components/panel/panel.component';
import { OktaAuthModule }                         from '@okta/okta-angular';

// Subcomponents
import { DataTableComponent }                     from './pages/maps/components/data-table/data-table.component';
import { KendoChartComponent }                    from './pages/maps/components/kendo-chart/kendo-chart.component';


// Component Module
import { NvD3Module }                             from 'ng2-nvd3';
import { AgmCoreModule }                          from '@agm/core';
import { CalendarModule }                         from 'angular-calendar';
import { FullCalendarModule }                     from 'ng-fullcalendar';
import { SlimLoadingBarModule }                   from 'ng2-slim-loading-bar';
import { NgxChartsModule }                        from '@swimlane/ngx-charts';
import { NgxDatatableModule }                     from '@swimlane/ngx-datatable';
import { TrendModule }                            from 'ngx-trend';
import { HighlightJsModule }                      from 'ngx-highlight-js';
import { CountdownModule }                        from 'ngx-countdown';
import { ChartsModule }                           from 'ng4-charts/ng4-charts';
import { TagsInputModule }                        from 'ngx-tags-input/dist';
import { Ng2TableModule }                         from 'ngx-datatable/ng2-table';
import { ChartsModule as KendoChartsModule }      from '@progress/kendo-angular-charts';
import { DialogModule }                           from '@progress/kendo-angular-dialog';
import { InputsModule }                           from '@progress/kendo-angular-inputs';
// import { DateInputComponent } from '@progress/kendo-angular-dateinputs';


// Pages
import { HomePage }                               from './pages/home/home';
import { MapsPage }                               from './pages/maps/maps';
import { ErrorHandlingPage }                      from './pages/extra/error-handling/error-handling.component';

// Services
import { AuthService }                            from './services/security/auth.service';
import { DataService }                            from './services/data/data.service';



// Material Design Modules
import { MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatTreeModule,
  MatToolbarModule,
  MatTooltipModule} from '@angular/material';

import 'hammerjs';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { SliderComponent } from './pages/maps/components/slider/slider.component';



// declare var HeatmapOverlay;

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    SidebarRightComponent,
    TopMenuComponent,
    FooterComponent,
    PanelComponent,
    HomePage,
    MapsPage,
    KendoChartComponent,
    DataTableComponent,
    ErrorHandlingPage,
    SliderComponent,

  ],
  imports: [
    AppRoutingModule,
    InputsModule,
    HttpModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyC5gJ5x8Yw7qP_DqvNq3IdZi2WUSiDjskk' + '&libraries=visualization' }),
    BrowserAnimationsModule,
    BrowserModule,
    CalendarModule.forRoot(),
    CountdownModule,
    ChartsModule,
    KendoChartsModule,
    FullCalendarModule,
    FormsModule,
    HighlightJsModule,
    NgbModule.forRoot(),
    NgxChartsModule,
    NvD3Module,
    ReactiveFormsModule,
    SlimLoadingBarModule.forRoot(),
    TrendModule,
    TagsInputModule.forRoot(),
    NgxDatatableModule,
    Ng2TableModule,
    OktaAuthModule.initAuth(environment.oktaConfig),
    GridModule,
    DialogModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    DropDownsModule,
    DateInputsModule

  ],
  providers: [ Title, AuthService, DataService ],
  bootstrap: [ AppComponent ]
})

// import 'heatmap.js';
// import "gmaps-heatmap";


export class AppModule {
  constructor(private router: Router, private titleService: Title, private route: ActivatedRoute) {
    router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        const title = 'Geo Spatial Dashboard | ' + this.route.snapshot.firstChild.data['title'];
        this.titleService.setTitle(title);
      }
    });
  }
}
