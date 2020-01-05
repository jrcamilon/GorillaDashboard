import { Injectable, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAuthenticated: boolean;
  public isAuthenticated$ = new BehaviorSubject<boolean>(this.isAuthenticated);
  public userCalims: any;
  public userCalims$ = new BehaviorSubject<any>(this.userCalims);

  constructor(public oktaAuth: OktaAuthService, private router: Router) {
    console.log('consturctor of auth service');
    this.oktaAuth.$authenticationState.subscribe(isAuthenticated => {
      this.checkAuthentication();
    });
  }

  async checkAuthentication() {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    if (this.isAuthenticated) {
      const userClaims = await this.oktaAuth.getUser();
      this.setUser(userClaims);
      this.setIsAuthenticated(true);
    } else {
      this.login();
    }
  }

  setUser(userClaims: any) {
    this.userCalims$.next(userClaims);
  }

  setIsAuthenticated(value: boolean) {
    this.isAuthenticated$.next(value);
  }

  login() {
    this.oktaAuth.loginRedirect('/home');
  }

  logout() {
    console.log('here');
    this.oktaAuth.logout('/home');

  }





}
