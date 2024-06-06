import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';
import { AuthService } from './service/auth-service/auth.service';
import { Router } from '@angular/router';
import { UserInfo } from './model/user-info';
import { Subscription } from 'rxjs';
import { StorageService } from './service/storage-service/storage.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit, OnDestroy {

  /* USER INFO VARIABLES */
  userInfo: UserInfo = new UserInfo(0, '', false);
  /* END USER INFO VARIABLES */

  flagClick: boolean = false;

  countries: any[];

  /* SUBSCRIPTION */
  private iuserInfoStatusSubscription: Subscription;
  /* END SUBSCRIPTION */

  constructor(
    public app: AppComponent,
    public appMain: AppMainComponent,
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.iuserInfoStatusSubscription = this.authService.userInfoStatus.subscribe((userInfo: UserInfo) => this.userInfo = userInfo);
    this.userInfo.isAutheticated = this.authService.isTheUserLogged();
    this.authService.changeUserInfoStatus(this.userInfo);

    if (this.userInfo.isAutheticated) {
      this.userInfo.id = this.authService.getId();
      this.userInfo.email = this.authService.getEmail();
      this.authService.changeUserInfoStatus(this.userInfo);
    }

  }

  ngOnDestroy(): void {
    if (this.iuserInfoStatusSubscription) {
      this.iuserInfoStatusSubscription.unsubscribe();
    }
  }

  goToPage(pageName: string): void {
    this.router.navigate([`${pageName}`]);
  }

  logout() {
    this.userInfo.isAutheticated = false;
    this.userInfo.email = '';
    this.userInfo.id = 0;
    this.authService.changeUserInfoStatus(this.userInfo);
    this.authService.logout();
  }

}
