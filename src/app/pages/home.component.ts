import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth-service/auth.service';

@Component({
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit{


    /* FLAG */
    isUserLoggedIn: boolean = false;
    /* FLAG */

    constructor(private router: Router, 
        private authService: AuthService,
        private cdRef: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.isUserLoggedIn = this.authService.isTheUserLogged();
        this.cdRef.detectChanges(); 
      }

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
