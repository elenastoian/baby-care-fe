import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetAllBabiesResponse } from '../dto/get-all-babies-response';
import { BabyModel } from '../model/baby';
import { UserInfo } from '../model/user-info';
import { AuthService } from '../service/auth-service/auth.service';
import { BabyService } from '../service/baby-service/baby.service';

@Component({
  selector: 'app-app.babies-tracker',
  templateUrl: './app.babies-tracker.component.html'
})
export class AppBabiesTrackerComponent implements OnInit, OnDestroy{
  userInfo: UserInfo = new UserInfo(0, '', false);

  /* ROUTE VARIABLES */
  userId: number = 0;
  /* END ROUTE VARIABLES */

  /* BABY VARIABLES */
  baby: BabyModel;
  /* END BABY VARIABLES */

  /* SUBSCRIPTION */
  private babyServiceSubscription: Subscription;
  private activateRouteSubscription: Subscription;
  private userInfoStatusSubscription: Subscription;
  /* END SUBSCRIPTION */

  /* ALL BABIES RESPONSE */
  resposeArray: GetAllBabiesResponse[];
  /* END ALL BABIES RESPONSE */

  constructor(
      private activateRoute: ActivatedRoute,
      private babyService: BabyService,
      private router: Router,
      private authService: AuthService,
      private cdRef: ChangeDetectorRef) { }

      ngOnInit(): void {
          this.activateRouteSubscription = this.activateRouteSubscription = this.activateRoute.params.subscribe();
  
          this.userInfoStatusSubscription = this.authService.userInfoStatus.subscribe((userInfo: UserInfo) => {
              this.userInfo = userInfo;
              console.log("UserInfo updated:", this.userInfo);
              this.cdRef.detectChanges();  // ensure changes are detected
            });

          this.babyServiceSubscription = this.babyService.getAllBabies().subscribe((data: GetAllBabiesResponse[]) => {
              console.log('Received babies data:', data);
              this.resposeArray = data; 
            });

          console.log("Baby info:", this.baby);
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

      goToBabyCareTrackerPage(id: number) {
          this.router.navigate(['track/', id]);
      }
}
