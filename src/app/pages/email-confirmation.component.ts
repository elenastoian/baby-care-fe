import { Component, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from '../service/storage-service/storage.service';
import { EmailConfirmationService } from '../service/email-confirmation-service/email-confirmation.service';
import { SendConfirmationTokenRequest } from '../dto/send-confirmation-token-request';

@Component({
    templateUrl: './email-confirmation.component.html'
})
export class EmailConfirmationComponent implements OnDestroy {

    /* PATH VARIABLES */
    token: string = '';
    /* PATH VARIABLES */

    /* DISPLAY VARIABLES */
    tokenConfirmationSucceed: boolean;
    tokenConfirmationFailed: boolean;
    /* END DISPLAY VARIABLES */

    /* SUBSCRIPTION */
    private settingsServiceSubscription: Subscription;
    private queryParamsSubscription: Subscription;
    private sendConfirmationTokenRequestSubscription: Subscription;
    /* END SUBSCRIPTION */

    constructor(
        private activatedRoute: ActivatedRoute,
        private settingsService: EmailConfirmationService,
        public router: Router,
        public storageService: StorageService
    ) { }

    ngOnInit(): void {
        this.queryParamsSubscription = this.activatedRoute.queryParams.subscribe(params => {
            this.token = params['token'];
        });

        this.sendConfirmationTokenRequestSubscription = this.settingsService.sendConfirmationTokenRequest(this.token).subscribe(
            (response: SendConfirmationTokenRequest) => {
                if (response.validation) {
                    this.tokenConfirmationSucceed = true;
                } else {
                    this.tokenConfirmationFailed = true;
                }
            }
        );
    }

    ngOnDestroy(): void {
        if (this.settingsServiceSubscription) {
            this.settingsServiceSubscription.unsubscribe();
        }

        if (this.queryParamsSubscription) {
            this.queryParamsSubscription.unsubscribe();
        }

        if (this.sendConfirmationTokenRequestSubscription) {
            this.sendConfirmationTokenRequestSubscription.unsubscribe();
        }
    }

    goToPage(pageName: string): void {
        this.router.navigate([`${pageName}`]);
    }
}
