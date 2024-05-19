import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UserInfo } from '../model/user-info';
import { ParentModel } from '../model/parent';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth-service/auth.service';
import { Subscription } from 'rxjs';
import { ParentService } from '../service/profile-service/parent.service';
import { GetParentResponse } from '../dto/get-parent-response';

@Component({
  selector: 'app-parent',
  templateUrl: './app.parent.component.html'
})
export class ParentComponent implements OnInit, OnDestroy{
    userInfo: UserInfo = new UserInfo(0, '', false);

    /* ROUTE VARIABLES */
    userId: number = 0;
    /* END ROUTE VARIABLES */

    /* PPARENT VARIABLES */
    parent: ParentModel;
    /* END PARENT VARIABLES */

    /* SUBSCRIPTION */
    private parentServiceSubscription: Subscription;
    private activateRouteSubscription: Subscription;
    private userInfoStatusSubscription: Subscription;
    /* END SUBSCRIPTION */

    constructor(
        private activateRoute: ActivatedRoute,
        private parentService: ParentService,
        private router: Router,
        private authService: AuthService,
        private cdRef: ChangeDetectorRef) { }

        ngOnInit(): void {
            console.log("this.userInfo")
            console.log(this.userInfo)
            this.activateRouteSubscription = this.activateRouteSubscription = this.activateRoute.params.subscribe();
    
            this.userInfoStatusSubscription = this.authService.userInfoStatus.subscribe((userInfo: UserInfo) => {
                this.userInfo = userInfo;
                console.log("UserInfo updated:", this.userInfo);
                this.cdRef.detectChanges();  // ensure changes are detected
              });

            this.parentServiceSubscription = this.parentService.findParentByUser().subscribe(
                (response: GetParentResponse) => {
                    this.parent = new ParentModel(
                        response.id,
                        response.name,
                        response.dateOfBirth,
                        response.age,
                        response.sex,
                        response.location,
                        this.userInfo.id,
                        null
                    );
                }
            );
        }

        ngOnDestroy(): void {

            if (this.parentServiceSubscription) {
                this.parentServiceSubscription.unsubscribe();
            }
    
            if (this.activateRouteSubscription) {
                this.activateRouteSubscription.unsubscribe();
            }
    
            if (this.userInfoStatusSubscription) {
                this.userInfoStatusSubscription.unsubscribe();
            }
        }

        redirectToEditAccountDataPage() {
           //TO BE IMPLEMENTED
        }

        redirectToEditParentDataPage() {
            //TO BE IMPLEMENTED
         }
}
