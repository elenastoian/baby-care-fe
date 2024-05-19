import { Component, OnDestroy } from '@angular/core';
import { AuthenticateRequest } from '../dto/authenticate-request';
import { AuthService } from '../service/auth-service/auth.service';
import { StorageService } from '../service/storage-service/storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInfo } from '../model/user-info';
import { Subscription } from 'rxjs';
import { UrlService } from '../service/url-service/url.service';

const EMAIL_OR_PASSWORD_IS_NOT_VALID_ERROR: string = '3';
const EMAIL_IS_NOT_CONFIRMED_ERROR: string = '4';
const EMAIL_IS_BANNED: string = '5';

@Component({
  selector: 'app-login',
  templateUrl: './app.login.component.html',
})
export class AppLoginComponent implements OnDestroy {

  /* FORM VALUES */
  email: string = '';
  password: string = '';
  /* END FORM VALUES */

  /* LOGIN FLAGS */
  invalidEmailOrPassword: boolean = false;
  emailIsNotConfirmed: boolean = false;
  emailIsBanned: boolean = false;
  /* END LOGIN FLAGS */

  /* FORM FLAGS */
  emailFieldIsEmptyError: boolean = false;
  passwordFieldIsEmptyError: boolean = false;
  /* END FORM FLAGS */


  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  /* SUBSCRIPTION */
  private authServiceSubscription: Subscription;
  private previousUrlStatusSubscription: Subscription;
  /* END SUBSCRIPTION */

  previousUrl: string = '';

  loadingTabDisplay: boolean = false;

  /* SUBSCRIPTION */
  private queryParamsSubscription: Subscription;
  /* END SUBSCRIPTION */

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
    private urlService: UrlService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.queryParamsSubscription = this.activatedRoute.queryParams.subscribe();

    if (this.authService.isTheUserLogged()) {
      this.isLoggedIn = true;
      this.router.navigate([`/`]);
    }

    this.previousUrlStatusSubscription = this.urlService.previousUrlStatus.subscribe((previousUrl: string) => { this.previousUrl = previousUrl; });
  }

  ngOnDestroy(): void {
    if (this.authServiceSubscription) {
      this.authServiceSubscription.unsubscribe();
    }

    if (this.previousUrlStatusSubscription) {
      this.previousUrlStatusSubscription.unsubscribe();
    }

    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }

  runLoginProcess(): void {

    this.loadingTabDisplay = true;

    if (this.isTheFormValid()) {
      this.sendLoginRequest();
    } else {
      this.loadingTabDisplay = false;
    }
  }

  isTheFormValid(): boolean {

    this.resetFormat();

    let isTheFormValid: boolean = true;

    if (this.email.length == 0) {
      this.emailFieldIsEmptyError = true;
      isTheFormValid = false;
    }

    if (this.password.length == 0) {
      this.passwordFieldIsEmptyError = true;
      isTheFormValid = false;
    }

    return isTheFormValid;
  }

  sendLoginRequest(): void {

    this.authServiceSubscription = this.authService.sendLoginRequest(new AuthenticateRequest(this.email.toLocaleLowerCase(), this.password)).subscribe({
      next: data => {
        if (this.isLoginSuccessful(data.token)) {
          this.storageService.saveUser(data);
          this.authService.changeUserInfoStatus(new UserInfo(data.id, data.email, true));
          this.loadingTabDisplay = false;
          this.router.navigate([`${this.previousUrl}`]);
        }
      },
      error: err => {
        this.invalidEmailOrPassword = true;
        this.isLoginFailed = true;
        this.loadingTabDisplay = false;
      }
    });
  }

  isLoginSuccessful(token: string): boolean {

    let isLoginSuccessful: boolean = true;

    if (token == EMAIL_OR_PASSWORD_IS_NOT_VALID_ERROR) {
      this.invalidEmailOrPassword = true;
      isLoginSuccessful = false;
      this.loadingTabDisplay = false;
    }

    if (token == EMAIL_IS_NOT_CONFIRMED_ERROR) {
      this.emailIsNotConfirmed = true;
      isLoginSuccessful = false;
      this.loadingTabDisplay = false;
    }

    if (token == EMAIL_IS_BANNED) {
      this.emailIsBanned = true;
      isLoginSuccessful = false;
      this.loadingTabDisplay = false;
    }

    return isLoginSuccessful;
  }

  reloadPage(): void {
    window.location.reload();
  }

  goToPage(pageName: string): void {
    this.router.navigate([`${pageName}`]);
  }

  onEnterKeyPressed(event: KeyboardEvent) {

    if (event.key === 'Enter') {
      this.runLoginProcess()
    }
  }

  resetFormat(){
    this.emailFieldIsEmptyError = false;
    this.passwordFieldIsEmptyError = false;
    this.emailIsNotConfirmed = false;
    this.emailIsBanned = false;
    this.invalidEmailOrPassword = false;
  }
}
