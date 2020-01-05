
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { OktaCallbackComponent, OktaAuthGuard } from '@okta/okta-angular';


// Pages
import { HomePage } from './pages/home/home';
import { MapsPage } from './pages/maps/maps';
import { ErrorHandlingPage } from './pages/extra/error-handling/error-handling.component';


const routes: Routes = [
  { path: '', redirectTo: '/maps', pathMatch: 'full', data: {title: 'Maps'} },
  // { path: 'home', component: HomePage, data: { title: 'Home'}},
  { path: 'maps', component: MapsPage, data: { title: 'Maps'}},
  // { path: 'implicit/callback', component: OktaCallbackComponent, data: {title: 'Callback'}},
  { path: 'error-page', component: ErrorHandlingPage, data: { title: 'Error Page'} },
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {useHash: true}), // <-- Use Hash for InfoBurst
  ],
  exports: [ RouterModule ],
  declarations: []
})


export class AppRoutingModule { }
