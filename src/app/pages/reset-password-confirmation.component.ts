import {Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
    templateUrl: './reset-password-confirmation.component.html'
})
export class ResetPasswordConfirmationComponent {

    constructor(private router: Router){}

    goToPage(pageName: string): void {
        this.router.navigate([`${pageName}`]);
      }
}
