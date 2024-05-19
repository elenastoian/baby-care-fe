import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { RecoveryService } from '../service/recovery-service/recovery.service';
import { Subscription } from 'rxjs';
import { StorageService } from '../service/storage-service/storage.service';
import { PasswordRecoveryRequest } from '../dto/password-recovery-request';

@Component({
    templateUrl: './recovery-password.component.html'
})
export class RecoveryPasswordComponent implements OnDestroy{

    email: string = '';

    emailFieldIsEmptyError: boolean = false;

    /* SUBSCRIPTION */
    private sendPasswordRecoveryEmailSubscription: Subscription;
    /* END SUBSCRIPTION */

    loadingTabDisplay: boolean = false;

    constructor(
        private router: Router, 
        private recoveryService: RecoveryService,
        private storageService: StorageService) { }

    ngOnDestroy(): void {
        if (this.sendPasswordRecoveryEmailSubscription) {
            this.sendPasswordRecoveryEmailSubscription.unsubscribe();
        }
    }

    sendPasswrodRecoveryEmail() {

        this.loadingTabDisplay = true;

        if (this.verifyInput()) {
            this.sendPasswordRecoveryEmailSubscription = this.recoveryService.sendPasswordRecoveryEmail(new PasswordRecoveryRequest(this.email)).subscribe(
                (response: PasswordRecoveryRequest) => {
                    this.loadingTabDisplay = false;
                    this.router.navigate(['recovery-email-confirmation']);
                }
            );
        }
    }

    goToPage(pageName: string): void {
        this.router.navigate([`${pageName}`]);
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
          this.sendPasswrodRecoveryEmail()
        }
      }
}
