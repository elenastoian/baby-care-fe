import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UserInfo } from '../model/user-info';
import { ParentModel } from '../model/parent';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth-service/auth.service';
import { Subscription } from 'rxjs';
import { ParentService } from '../service/parent-service/parent.service';
import { GetParentResponse } from '../dto/get-parent-response';
import { UpdateParentRequest } from '../dto/update-parent-request';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-parent',
  providers: [MessageService, ConfirmationService],
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

    /* EDIT MODE FLAG */
    isEditModeForParentData: boolean = false;
    isEditModeForAccountData: boolean = false;
    /* END EDIT MODE FLAG */

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
        private messageService: MessageService,
        private cdRef: ChangeDetectorRef) { }

        ngOnInit(): void {
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

        updateParent() {
            const updateParentRequest = new UpdateParentRequest(
                this.parent.name,
                this.parent.dateOfBirth,
                this.parent.sex,
                this.parent.location
            );
        
            this.parentService.updateParent(updateParentRequest).subscribe(
                response => {
                    console.log(response);
                    this.isEditModeForParentData = false;
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Parent data saved.', life: 3000 });
                    this.cdRef.detectChanges();
                },
                error => {
                    console.error("Error updating parent data", error);
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save parent data.', life: 3000 });
                }
            );
        }

        updateAccountData() {
            //TO BE IMPLEMENTED LATER
        }
}
