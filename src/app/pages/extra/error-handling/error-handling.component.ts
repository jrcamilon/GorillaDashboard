import { Component, OnDestroy } from '@angular/core';
import pageSettings from '../../../config/page-settings';
import { ErrorHandlingService } from '../extra-services/error-handling.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'error-handling-page',
  templateUrl: './error-handling.component.html',
  styleUrls: ['./error-handling.component.scss']
})

export class ErrorHandlingPage implements OnDestroy {
  pageSettings = pageSettings;
  endpoint: string = 'We couldn`t find it...';
  errCode: string = '404';
  message: string = 'The page you`re looking for doesn`t exist. Perhaps, there pages will help find what you`re looking for.';

  subscription: Subscription;

  constructor(public _err: ErrorHandlingService, private router: Router) {
    this.pageSettings.pageEmpty = true;
    this.subscription = this._err.errorPagePackage.subscribe(err => {
      console.log(err);
      this.errCode = err.errCode;
      this.endpoint = err.endpoint;
      this.message = err.message;
      console.log(this.endpoint);

    })
  }

  ngOnDestroy() {
    this.pageSettings.pageEmpty = false;
    this.subscription.unsubscribe();
  }

}
