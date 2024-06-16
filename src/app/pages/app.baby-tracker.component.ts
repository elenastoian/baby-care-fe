import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { BabyCareTrackerService } from '../service/baby-care-tracker-service/baby-care-tracker.service';
import { UserInfo } from '../model/user-info';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth-service/auth.service';
import { BabyCareTrackerResponse } from '../dto/baby-care-tracker-reponse';
import { StoolRecordResponse } from '../dto/stool-record-response';
import { SleepRecordResponse } from '../dto/sleep-record-response';
import { FeedRecordResponse } from '../dto/feed-record-response';

@Component({
  selector: 'app-app.baby-tracker',
  providers: [MessageService, ConfirmationService],
  templateUrl: './app.baby-tracker.component.html',
  // styles: [`
  //     :host ::ng-deep  .p-frozen-column {
  //         font-weight: bold;
  //     }

  //     :host ::ng-deep .p-datatable-frozen-tbody {
  //         font-weight: bold;
  //     }

  //     :host ::ng-deep .p-progressbar {
  //         height:.5rem;
  //     }
  // `]
})
export class AppBabyTrackerComponent implements OnInit, OnDestroy {
  userInfo: UserInfo = new UserInfo(0, '', false);

  /* ROUTE VARIABLES */
  //userId: number = 0;
  babyId: number = 0;
  /* END ROUTE VARIABLES */

  /* SLEEP RECORD VARIABLES */
  sleepRecordArray: SleepRecordResponse[];
  sleepRecord: SleepRecordResponse;
  /* END SLEEP RECORD VARIABLES */

  /* STOOL RECORD VARIABLES */
  stoolRecordArray: StoolRecordResponse[];
  stoolRecord: StoolRecordResponse;
  /* END STOOL RECORD VARIABLES */

  /* SLEEP RECORD VARIABLES */
  feedRecordArray: FeedRecordResponse[];
  feedRecord: FeedRecordResponse;
  /* END SLEEP RECORD VARIABLES */

  /* SUBSCRIPTION */
  private babyCareTrackerSubscription: Subscription;
  private activateRouteSubscription: Subscription;
  private userInfoStatusSubscription: Subscription;
  /* END SUBSCRIPTION */

  constructor(
    private activateRoute: ActivatedRoute,
    private babyCareTrackerService: BabyCareTrackerService,
    private messageService: MessageService, 
    private router: Router,
    private authService: AuthService,
    private confirmService: ConfirmationService, 
    private cdRef: ChangeDetectorRef) {}

    ngOnInit() {
      this.activateRouteSubscription = this.activateRouteSubscription = this.activateRoute.params.subscribe(params => {
        this.babyId = params.id;
    });
  
      this.userInfoStatusSubscription = this.authService.userInfoStatus.subscribe((userInfo: UserInfo) => {
        this.userInfo = userInfo;
        console.log("UserInfo updated:", this.userInfo);
        this.cdRef.detectChanges();  // ensure changes are detected
      });

      this.babyCareTrackerSubscription = this.babyCareTrackerService.getCareTracker(this.babyId).subscribe(
        (response: BabyCareTrackerResponse) => {
            this.sleepRecordArray = response.sleepRecords;
            this.stoolRecordArray = response.stoolRecords;
            this.feedRecordArray = response.feedRecords;
          }
      );
  }

  ngOnDestroy(): void {

    if (this.babyCareTrackerSubscription) {
        this.babyCareTrackerSubscription.unsubscribe();
    }

    if (this.activateRouteSubscription) {
        this.activateRouteSubscription.unsubscribe();
    }

    if (this.userInfoStatusSubscription) {
        this.userInfoStatusSubscription.unsubscribe();
    }
}
}
