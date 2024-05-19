import {Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
    templateUrl: './reset-password-failed.component.html'
})
export class ResetPasswordFailedComponent {

    constructor(private router: Router){}

    goToPage(pageName: string): void {
        this.router.navigate([`${pageName}`]);
      }
}
