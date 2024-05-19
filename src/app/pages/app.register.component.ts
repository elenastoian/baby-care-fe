import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth-service/auth.service';
import { StorageService } from 'src/app/service/storage-service/storage.service';

const EMAIL_IS_ALREADY_USED_ERROR: string = "1";
const EMAIL_IS_NOT_VALID_ERROR: string = "2";
const TOKEN_IS_NOT_VALID_1_ERROR: string = '';
const TOKEN_IS_NOT_VALID_2_ERROR: string = '';

@Component({
  selector: 'app-register',
  templateUrl: './app.register.component.html',
})
export class AppRegisterComponent implements OnInit, OnDestroy {

  /* FORM VARIABLES */
  name: string = '';
  email: string = '';
  emailRetype: string = '';
  password: string = '';
  passwordRetype: string = '';
  /* END FORM VARIABLES */

  /* REGISTRATION FLAGS */
  isSuccessful = false;
  isSignUpFailed = false;
  /* END REGISTRATION FLAGS */

  errorMessage = '';

  /* EMAIL ERROR FLAGS */
  emailTakenErrorFlag: boolean = false;
  emailIsNotValidErrorFlag: boolean = false;
  /* END EMAIL ERROR FLAGS */

  /* FORM ERROR FLAGS */
  nameIsToShortErrorFlag: boolean = false;
  emailIsEmptyErrorFlag: boolean = false;
  emailFieldsDoNotMatchFlag: boolean = false;
  passwordCanNotBeEmptyFlag: boolean = false;
  passwordIsToShortFlag: boolean = false;
  passwordFieldsDoNotMatch: boolean = false;
  somethingWentWrong: boolean = false;
  /* END FORM ERROR FLAGS */

  /* TOKEN FLAGS */
  tokenIsNotValidErrorFlag: boolean = false;
  /* TOKEN FLAGS */

  /* SUBSCRIPTION */
  private authServiceSubscription: Subscription;
  /* END SUBSCRIPTION */

  loadingTabDisplay: boolean = false;

  constructor(private authService: AuthService, private router: Router, private storageService: StorageService) { }

  ngOnInit(): void {
    this.resetFormFields();
    this.resertFormFlags();
  }

  ngOnDestroy(): void {
    if (this.authServiceSubscription) {
      this.authServiceSubscription.unsubscribe();
    }
  }

  runRegistrationProcess(): void {

    this.loadingTabDisplay = true;

    if (this.isTheFormValid()) {
      this.sendRegistrationRequest();
    }else{
      this.loadingTabDisplay = false;
    }
  }

  isTheFormValid(): boolean {

    let isTheFormValid: boolean = true;

    this.resertFormFlags();

    if (this.name.length < 5) {
      this.nameIsToShortErrorFlag = true;
      isTheFormValid = false;
    }

    if (this.email.length == 0) {
      this.emailIsEmptyErrorFlag = true;
      isTheFormValid = false;
    }

    if (this.email != this.emailRetype) {
      this.emailFieldsDoNotMatchFlag = true;
      isTheFormValid = false;
    }

    if (this.password.length == 0) {
      this.passwordCanNotBeEmptyFlag = true;
      isTheFormValid = false;
    }

    if (this.password.length < 8) {
      this.passwordIsToShortFlag = true;
      isTheFormValid = false;
    }

    if (this.password != this.passwordRetype) {
      this.passwordFieldsDoNotMatch = true;
      isTheFormValid = false;
    }

    if (!isTheFormValid) {
      return false;
    }

    return true;
  }

  isEmailValid(token: string): boolean {

    this.emailTakenErrorFlag = false;
    this.emailIsNotValidErrorFlag = false;
    this.tokenIsNotValidErrorFlag = false;

    if (token == EMAIL_IS_ALREADY_USED_ERROR) {
      this.emailTakenErrorFlag = true;
      this.loadingTabDisplay = false;
      return false;
    } else if (token == EMAIL_IS_NOT_VALID_ERROR) {
      this.emailIsNotValidErrorFlag = true;
      this.loadingTabDisplay = false;
      return false;
    } else if (token == TOKEN_IS_NOT_VALID_1_ERROR && token == TOKEN_IS_NOT_VALID_2_ERROR) {
      this.tokenIsNotValidErrorFlag = true;
      this.loadingTabDisplay = false;
      return false;
    }

    return true;
  }

  sendRegistrationRequest() {
    this.authServiceSubscription = this.authService.register(this.name, this.email.toLocaleLowerCase(), this.password).subscribe({
      next: data => {

        if (this.isEmailValid(data.token)) {

          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.loadingTabDisplay = false;
          this.router.navigate([`/sign-up-confirmation`]);
        }
      },
      error: err => {
        this.somethingWentWrong = true;
        this.isSignUpFailed = true;
        this.loadingTabDisplay = false;
      }
    });
  }

  resertFormFlags(): void {
    this.nameIsToShortErrorFlag = false;
    this.emailIsEmptyErrorFlag = false;
    this.emailFieldsDoNotMatchFlag = false;
    this.passwordCanNotBeEmptyFlag = false;
    this.passwordIsToShortFlag = false;
    this.passwordFieldsDoNotMatch = false;
    this.somethingWentWrong = false;
  }

  resetFormFields(): void {
    this.name = '';
    this.email = '';
    this.emailRetype = '';
    this.password = '';
    this.passwordRetype = '';
  }

  goToPage(pageName: string): void {
    this.router.navigate([`${pageName}`]);
  }

  onEnterKeyPressed(event: KeyboardEvent) {

    if (event.key === 'Enter') {
      this.runRegistrationProcess();
    }
  }
}
