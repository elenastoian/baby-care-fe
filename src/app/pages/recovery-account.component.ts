import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from '../service/storage-service/storage.service';
import { RecoveryService } from '../service/recovery-service/recovery.service';
import { RecoveryAccountRequest } from '../dto/recovery-account-request';

@Component({
    templateUrl: './recovery-account.component.html'
})
export class RecoveryAccountComponent implements OnDestroy {

    email: string = '';

    emailFieldIsEmptyError: boolean = false;

    /* SUBSCRIPTION */
    private userInfoStatusSubscription: Subscription;
    /* END SUBSCRIPTION */

    loadingTabDisplay: boolean = false;

    constructor(
        private router: Router,
        private recoveryService: RecoveryService,
        private storageService: StorageService) { }

    ngOnDestroy(): void {
        if (this.userInfoStatusSubscription) {
            this.userInfoStatusSubscription.unsubscribe();
        }
    }

    goToPage(pageName: string): void {
        this.router.navigate([`${pageName}`]);
    }

    sendAccountRecoveryEmail() {

        this.loadingTabDisplay = true;

        if (this.verifyInput()) {
            this.userInfoStatusSubscription = this.recoveryService.sendAccountRecoveryEmail(new RecoveryAccountRequest(this.email)).subscribe(
                (response: RecoveryAccountRequest) => {
                    this.loadingTabDisplay = false;
                    this.router.navigate(['recovery-email-confirmation']);
                }
            );
        } else {
            this.loadingTabDisplay = false;
        }
    }

    verifyInput(): boolean {

        this.emailFieldIsEmptyError = false;

        if (this.email.length == 0) {
            this.emailFieldIsEmptyError = true;
            this.loadingTabDisplay = false;
            return false;
        }

        return true;
    }

    onEnterKeyPressed(event: KeyboardEvent) {

        if (event.key === 'Enter') {
            this.sendAccountRecoveryEmail();
        }
    }
}
