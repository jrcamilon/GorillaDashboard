import { Component, Input, Output, EventEmitter, Renderer2, OnDestroy, OnInit } from '@angular/core';
import pageSettings from '../../config/page-settings';
import { AuthService } from '../../services/security/auth.service';
import UserClaims from '../../services/security/user-claims';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy, OnInit {
	userProfile: UserClaims;
	fullName: string;
  @Input() pageSidebarTwo;
	@Output() toggleSidebarRightCollapsed = new EventEmitter<boolean>();
	@Output() toggleMobileSidebar = new EventEmitter<boolean>();
	@Output() toggleMobileRightSidebar = new EventEmitter<boolean>();
	pageSettings = pageSettings;

  mobileSidebarToggle() {
		this.toggleMobileSidebar.emit(true);
  }
  mobileRightSidebarToggle() {
		this.toggleMobileRightSidebar.emit(true);
  }
	toggleSidebarRight() {
		this.toggleSidebarRightCollapsed.emit(true);
	}

	mobileTopMenuToggle() {
	  this.pageSettings.pageMobileTopMenuToggled = !this.pageSettings.pageMobileTopMenuToggled;
	}

	mobileMegaMenuToggle() {
	  this.pageSettings.pageMobileMegaMenuToggled = !this.pageSettings.pageMobileMegaMenuToggled;
	}

	ngOnInit() {

	}

	ngOnDestroy() {
	  this.pageSettings.pageMobileTopMenuToggled = false;
	  this.pageSettings.pageMobileMegaMenuToggled = false;
	}

	logout() {
    this.auth.logout();
	}

	setUserName() {
		this.fullName = this.userProfile.given_name + ' ' + this.userProfile.family_name;
	}

  constructor(private renderer: Renderer2, public auth: AuthService) {
		this.auth.userCalims$.subscribe(userClaims => {
			if (userClaims !== undefined) {
				this.userProfile = userClaims;
				this.setUserName();
			}
		});
  }
}
