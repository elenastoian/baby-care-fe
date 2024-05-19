import { Component, OnDestroy } from '@angular/core';
import { ResendConfirmationEmailService } from '../service/resend-confirmation-email-service/resend-confirmation-email.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from '../service/storage-service/storage.service';
import { ResendConfirmationEmailRequest } from '../dto/resend-confirmation-email-request';

@Component({
    templateUrl: './resend-confirmation-email.component.html'
})
export class ResendConfirmationEmailComponent implements OnDestroy{

    email: string = '';

    emailFieldIsEmptyError: boolean;
    emailAlreadyConfirmedOrWrongError: boolean;

    /* SUBSCRIPTION */
    private sendResendConfirmationEmailServiceSubscription: Subscription;
    /* END SUBSCRIPTION */

    loadingTabDisplay: boolean = false;

    constructor(private resendConfirmationEmailService: ResendConfirmationEmailService, private router: Router, private storageService: StorageService) { }

    ngOnDestroy(): void {
        if (this.sendResendConfirmationEmailServiceSubscription) {
            this.sendResendConfirmationEmailServiceSubscription.unsubscribe();
        }
    }

    sendResendConfirmationEmailService() {

        this.loadingTabDisplay = true;

        if (this.verifyInput()) {
            this.sendResendConfirmationEmailServiceSubscription = this.resendConfirmationEmailService.sendResendConfirmationEmailService(new ResendConfirmationEmailRequest(this.email, false)).subscribe(
                (response: ResendConfirmationEmailRequest) => {
                    this.emailAlreadyConfirmedOrWrongError = false;

                    if (!response.result) {
                        this.emailAlreadyConfirmedOrWrongError = true;
                        this.loadingTabDisplay = false;
                    } else {
                        this.loadingTabDisplay = false;
                        this.goToPage('resend-confirmation-email-confirmation');
                    }
                }
            );
        }else{
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

    goToPage(pageName: string): void {
        this.router.navigate([`${pageName}`]);
    }

    onEnterKeyPressed(event: KeyboardEvent) {

        if (event.key === 'Enter') {
          this.sendResendConfirmationEmailService()
        }
      }
}
