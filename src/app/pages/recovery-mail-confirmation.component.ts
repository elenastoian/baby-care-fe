import {Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
    templateUrl: './recovery-mail-confirmation.component.html'
})
export class RecoveryMailConfirmationComponent {

    constructor(private router: Router){}

    goToPage(pageName: string): void {
        this.router.navigate([`${pageName}`]);
      }
}
