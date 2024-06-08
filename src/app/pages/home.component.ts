import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth-service/auth.service';
import { ParentService } from '../service/parent-service/parent.service';
import { UserInfo } from '../model/user-info';
import { Subscription } from 'rxjs';
import { GetParentResponse } from '../dto/get-parent-response';

@Component({
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit{

    userInfo: UserInfo = new UserInfo(0, '', false);

    /* FLAG */
    isUserLoggedIn: boolean = false;
    isParentAccountCreated: boolean = false;
    /* FLAG */

    private parentServiceSubscription: Subscription;

    constructor(private router: Router, 
        private authService: AuthService,
        private cdRef: ChangeDetectorRef,
        private parentService: ParentService) {}

    ngOnInit(): void {
        this.isUserLoggedIn = this.authService.isTheUserLogged();

        if(this.isUserLoggedIn == true){
              this.parentServiceSubscription = this.parentService.findParentByUser().subscribe(
                (response: GetParentResponse) => {
                  if (response.id != null) {
                    this.isParentAccountCreated = true;
                  } 
                },
              );
        }
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
