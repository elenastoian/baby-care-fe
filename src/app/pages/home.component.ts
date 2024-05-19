import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    templateUrl: './home.component.html'
})
export class HomeComponent {


    constructor(private router: Router) {}

    goToPage(pageName: string): void {
        this.router.navigate([`${pageName}`]);
    }

    downloadCV() {
        const link = document.createElement('a');
        link.href = 'assets/Elena_Stoian_CV.pdf';
        link.download = 'Elena_Stoian_CV.pdf'; 
        link.click();
      }
}
