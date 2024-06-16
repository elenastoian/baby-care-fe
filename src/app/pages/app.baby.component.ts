import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { BabyModel } from '../model/baby';
import { UserInfo } from '../model/user-info';
import { AuthService } from '../service/auth-service/auth.service';
import { BabyService } from '../service/baby-service/baby.service';
import { UpdateBabyRequest } from '../dto/update-baby-request';
import { GetBabyResponse } from '../dto/get-baby-response';

@Component({
  selector: 'app-app.baby',
  templateUrl: './app.baby.component.html',
  providers: [MessageService],
})
export class AppBabyComponent implements OnInit, OnDestroy {

  userInfo: UserInfo = new UserInfo(0, '', false);

  /* ROUTE VARIABLES */
  babyId: number = 0;
  /* END ROUTE VARIABLES */

  /* BABY VARIABLES */
  baby: BabyModel;
  /* END BABY VARIABLES */

  /* EDIT MODE FLAG */
  isEditMode: boolean = false;
  /* END EDIT MODE FLAG */

  /* SUBSCRIPTION */
  private babyServiceSubscription: Subscription;
  private activateRouteSubscription: Subscription;
  private userInfoStatusSubscription: Subscription;
  /* END SUBSCRIPTION */

  constructor(
      private activateRoute: ActivatedRoute,
      private babyService: BabyService,
      private router: Router,
      private authService: AuthService,
      private messageService: MessageService,
      private cdRef: ChangeDetectorRef) { }

      ngOnInit(): void {
        this.activateRouteSubscription = this.activateRouteSubscription = this.activateRoute.params.subscribe(params => {
          this.babyId = params.id;
      });
    
        this.userInfoStatusSubscription = this.authService.userInfoStatus.subscribe((userInfo: UserInfo) => {
          this.userInfo = userInfo;
          console.log("UserInfo updated:", this.userInfo);
          this.cdRef.detectChanges();  // ensure changes are detected
        });
    
        this.babyServiceSubscription = this.babyService.findBabyById(this.babyId).subscribe(
          (response: any) => {
    
              this.baby = new BabyModel(
                response.id,
                response.name,
                response.dateOfBirth,
                response.age,
                response.sex,
                response.weight,
                response.height,
                response.typeOfBirth,
                response.birthWeight,
                response.comments,
                null
              );
            }
        );
      }

      ngOnDestroy(): void {

          if (this.babyServiceSubscription) {
              this.babyServiceSubscription.unsubscribe();
          }
  
          if (this.activateRouteSubscription) {
              this.activateRouteSubscription.unsubscribe();
          }
  
          if (this.userInfoStatusSubscription) {
              this.userInfoStatusSubscription.unsubscribe();
          }
      }
    
      updateBaby() {
        const updateBabyRequest = new UpdateBabyRequest(
          this.babyId,
          this.baby.name,
          this.baby.dateOfBirth,
          this.baby.sex,
          this.baby.weight,
          this.baby.height,
          this.baby.typeOfBirth,
          this.baby.birthWeight,
          this.baby.comments
        )

        this.babyService.updateBaby(updateBabyRequest).subscribe(
          (response: GetBabyResponse) => {
              this.isEditMode = false;
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Baby data saved.', life: 3000 });
              this.cdRef.detectChanges();
          },
          error => {
              console.error("Error updating baby data", error);
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save baby data.', life: 3000 });
          }
        )
    }
  
}
