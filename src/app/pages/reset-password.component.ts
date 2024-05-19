import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecoveryService } from '../service/recovery-service/recovery.service';
import { Subscription } from 'rxjs';
import { StorageService } from '../service/storage-service/storage.service';
import { ResetPasswordRequest } from '../dto/reset-password-request';

@Component({
    templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

    token: string = '';
    password: string = '';
    userId: number = 0;
    passwordConfirm: string = '';

    /* FORM ERROR FLAGS */
    passwordLengthError: boolean = false;
    passwordCanNotBeEmptyFlag: boolean = false;
    passwordFieldsDoNotMatch: boolean = false;
    /* END FORM ERROR FLAGS */

    /* SUBSCRIPTION */
    private sendPasswordResetSubscription: Subscription;
    /* END SUBSCRIPTION */

    constructor(
        private activatedRoute: ActivatedRoute, 
        private recoveryService: RecoveryService, 
        private router: Router,
        public storageService: StorageService
        ) { }


    ngOnInit(): void {

        this.activatedRoute.queryParamMap.forEach(
            (p: any) => {
                this.token = p.params.token;
                this.userId = p.params.userId;
            }
        );
    }

    ngOnDestroy(): void {
        if (this.sendPasswordResetSubscription) {
            this.sendPasswordResetSubscription.unsubscribe();
        }
    }

    sendResetPasswordRequest() {

        if (this.checkFields()) {
            this.sendPasswordResetSubscription = this.recoveryService.sendPasswordReset(new ResetPasswordRequest(this.userId, this.token, this.password, false)).subscribe(
                (response: ResetPasswordRequest) => {
                    if (response.result) {
                        this.goToPage('/password-recovery-confirmation');
                    } else {
                        this.goToPage('/password-recovery-failed');
                    }
                }
            );
        }
    }

    checkFields(): boolean {

        let flag = true;

        this.passwordLengthError = false;
        this.passwordCanNotBeEmptyFlag = false;
        this.passwordFieldsDoNotMatch = false;

        if (this.password != this.passwordConfirm) {
            this.passwordFieldsDoNotMatch = true;
            flag = false;
        }

        if (this.password.length == 0) {
            this.passwordCanNotBeEmptyFlag = true;
            flag = false;
        }

        if (this.password.length < 8) {
            this.passwordLengthError = true;
            flag = false;
        }

        return flag;
    }

    goToPage(pageName: string): void {
        this.router.navigate([`${pageName}`]);
    }
}
