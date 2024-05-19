import {Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
    templateUrl: './recovery-email-sent-confirmation.component.html'
})
export class RecoveryEmailSentConfirmationComponent {


    constructor(private router: Router){}
    
    goToPage(pageName: string): void {
        this.router.navigate([`${pageName}`]);
    }
}
