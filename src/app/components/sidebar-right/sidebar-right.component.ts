import { group, animate, query, style, trigger, transition, state } from '@angular/animations';
import { Component, Input, Output, EventEmitter, ElementRef, HostListener } 		 from '@angular/core';
import * as global 			 from '../../config/globals';
import { AuthService } from '../../services/security/auth.service';
import { UserClaims } from '@okta/okta-angular';

@Component({
  selector: 'sidebar-right',
  templateUrl: './sidebar-right.component.html'
})

export class SidebarRightComponent {
  global = global;
  userProfile: UserClaims;
	@Output() hideMobileRightSidebar = new EventEmitter<boolean>();

	@HostListener('document:click', ['$event'])
  clickout(event) {
    if(!this.eRef.nativeElement.contains(event.target)) {
		  this.hideMobileRightSidebar.emit(true);
    }
  }

  constructor(private eRef: ElementRef, public auth: AuthService) {
    this.auth.userCalims$.subscribe(profile => {
      this.userProfile = profile;
    });
  }
}
