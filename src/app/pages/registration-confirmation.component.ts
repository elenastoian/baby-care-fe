import {Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
    templateUrl: './registration-confirmation.component.html'
})
export class RegistrationConfirmationComponent {

    constructor(private router: Router){}

    goToPage(pageName: string): void {
        this.router.navigate([`${pageName}`]);
    }
}
