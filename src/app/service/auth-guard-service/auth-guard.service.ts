import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { StorageService } from '../storage-service/storage.service';
import { UserInfo } from 'src/app/model/user-info';
import { AuthService } from '../auth-service/auth.service';
import { UrlService } from '../url-service/url.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements OnInit, OnDestroy {

  /* USER INFO VARIABLES */
  userInfo: UserInfo = new UserInfo(0, '', false);
  /* END USER INFO VARIABLES */

  /* SUBSCRIPTION */
  private userInfoStatusSubscription: Subscription;
  /* END SUBSCRIPTION */

  constructor(private storageSevice: StorageService, private router: Router, private authService: AuthService, private urlService: UrlService) { }

  ngOnInit(): void {
    this.userInfoStatusSubscription = this.authService.userInfoStatus.subscribe((userInfo: UserInfo) => this.userInfo = userInfo);
  }

  ngOnDestroy(): void {
    if (this.userInfoStatusSubscription) {
      this.userInfoStatusSubscription.unsubscribe();
    }
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    this.urlService.changePreviousUrlStatus(state.url);

    let isTheUserLoginedIn: boolean = this.storageSevice.isLoggedIn();

    if (!isTheUserLoginedIn) {
      this.router.navigate([`/login`]);
    }

    return isTheUserLoginedIn;
  }
}
