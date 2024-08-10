import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { BabyTrackerService } from '../service/baby-tracker-service/baby-tracker.service';
import { UserInfo } from '../model/user-info';
import { isEmpty, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth-service/auth.service';
import { SleepRecordResponse } from '../dto/sleep-record-response';
import { FeedRecordResponse } from '../dto/feed-record-response';
import { ScreenTimeRecordResponse } from '../dto/screen-time-record-response';

@Component({
  selector: 'app-app.baby-tracker',
  providers: [MessageService, ConfirmationService],
  templateUrl: './app.baby-tracker.component.html',
  styles: [
    `:host ::ng-deep .p-dialog .product-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
    }`
]
})
export class AppBabyTrackerComponent implements OnInit, OnDestroy {
    trackDialog: boolean = false;

    submitted: boolean = false;

  // ...................... //
  userInfo: UserInfo = new UserInfo(0, '', false);

  /* ROUTE VARIABLES */
  //userId: number = 0;
  babyId: number = 0;
  /* END ROUTE VARIABLES */

  /* SLEEP RECORD VARIABLES */
  sleepRecordArray: SleepRecordResponse[] = [];
  sleepRecord: SleepRecordResponse = new SleepRecordResponse(0, null, null, "");
  /* END SLEEP RECORD VARIABLES */

  /* STOOL RECORD VARIABLES */
  screenTimeRecordArray: ScreenTimeRecordResponse[];
  screenTimeRecord: ScreenTimeRecordResponse;
  /* END STOOL RECORD VARIABLES */

  /* SLEEP RECORD VARIABLES */
  feedRecordArray: FeedRecordResponse[];
  feedRecord: FeedRecordResponse;
  /* END SLEEP RECORD VARIABLES */

  /* SUBSCRIPTION */
  private sleepRecordSubscription: Subscription;
  private screneTimeRecordSubscription: Subscription
  private feedRecordSubscription: Subscription
  private activateRouteSubscription: Subscription;
  private userInfoStatusSubscription: Subscription;
  /* END SUBSCRIPTION */

  constructor(
    private activateRoute: ActivatedRoute,
    private babyCareTrackerService: BabyTrackerService,
    private messageService: MessageService, 
    private router: Router,
    private authService: AuthService,
    private confirmService: ConfirmationService, 
    private cdRef: ChangeDetectorRef) {}

    ngOnInit() {
      this.activateRouteSubscription = this.activateRoute.params.subscribe(params => {
        this.babyId = params.babyId;
      });
      
  
      this.userInfoStatusSubscription = this.authService.userInfoStatus.subscribe((userInfo: UserInfo) => {
        this.userInfo = userInfo;
        console.log("UserInfo updated:", this.userInfo);
        this.cdRef.detectChanges();  // ensure changes are detected
      });

      this.getAllSleepRecords();
      this.cdRef.detectChanges();
  }

  ngOnDestroy(): void {

    if (this.sleepRecordSubscription) {
        this.sleepRecordSubscription.unsubscribe();
    }
    if (this.screneTimeRecordSubscription) {
      this.screneTimeRecordSubscription.unsubscribe();
    }
   if (this.feedRecordSubscription) {
    this.feedRecordSubscription.unsubscribe();
    }
    if (this.activateRouteSubscription) {
        this.activateRouteSubscription.unsubscribe();
    }
    if (this.userInfoStatusSubscription) {
        this.userInfoStatusSubscription.unsubscribe();
    }
  }

  onTabChange(event: any) {
    console.log("Tab changed: ", event);

    if(event.index === 1) {
      console.log("index of event 1. Call getallScreenTimeRecords.");

      this.getAllScreenTimeRecords();
    }

    if(event.index === 2) {
      console.log("index of event 2. Call getAllFeedRecords.");

      this.getAllFeedRecords();
    }

  }

  getAllSleepRecords() {
    console.log("INSIDE GET ALL SLEEP RECORDS.");

    this.sleepRecordSubscription = this.babyCareTrackerService.getAllSleepRecords(this.babyId).subscribe(
      (response: SleepRecordResponse[]) => {

        console.log("SleepRecord response:", response);
        this.sleepRecordArray = response;
        this.cdRef.detectChanges();
        }
    );
}

  getAllScreenTimeRecords() {
  console.log("INSIDE GET ALL SCREEN TIME RECORDS.");

  this.screneTimeRecordSubscription = this.babyCareTrackerService.getAllScreenTimeRecords(this.babyId).subscribe(
    (response: ScreenTimeRecordResponse[]) => {

      console.log("ScreenTimeRecord response:", response);
      this.screenTimeRecordArray = response;
      this.cdRef.detectChanges();
      }
  );
}

  getAllFeedRecords() {
  console.log("INSIDE GET ALL FEED RECORDS.");

  this.feedRecordSubscription = this.babyCareTrackerService.getAllFeedRecords(this.babyId).subscribe(
    (response: FeedRecordResponse[]) => {

      console.log("FeedRecordResponse response:", response);
      this.feedRecordArray = response;
      this.cdRef.detectChanges();
      }
  );
}

openNew() {
  this.submitted = false;
  this.trackDialog = true;
  }

  deleteSelectedTracks() {
    // this.confirmationService.confirm({
    //     message: 'Are you sure you want to delete the selected products?',
    //     header: 'Confirm',
    //     icon: 'pi pi-exclamation-triangle',
    //     accept: () => {
    //         this.products = this.products.filter((val) => !this.selectedProducts?.includes(val));
    //         this.selectedProducts = null;
    //         this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    //     }
    // });
}

editTrack(track: any) { //change it with request obj
  // this.babyCareTracker = { ...track };
  this.trackDialog = true;
}

hideDialog() {
  this.trackDialog = false;
  this.submitted = false;
}

saveTrack() {
  this.submitted = true;

}

shouldDisplayDateForSleep(index: number): boolean {
  if (index === 0) {
    return true; // Always display the date for the first record
  }

  const current = new Date(this.sleepRecordArray[index].sleepStart).toDateString();
  const previous = new Date(this.sleepRecordArray[index - 1].sleepStart).toDateString();

  return current !== previous;
}

shouldDisplayDateForScreenTime(index: number): boolean {
  if (index === 0) {
    return true; // Always display the date for the first record
  }

  const current = new Date(this.screenTimeRecordArray[index].screenTimeStart).toDateString();
  const previous = new Date(this.screenTimeRecordArray[index - 1].screenTimeStart).toDateString();

  return current !== previous;
}

shouldDisplayDateForFeed(index: number): boolean {
  if (index === 0) {
    return true; // Always display the date for the first record
  }

  const current = new Date(this.feedRecordArray[index].feedTime).toDateString();
  const previous = new Date(this.feedRecordArray[index - 1].feedTime).toDateString();

  return current !== previous;
}




  formatDuration(duration: string): string {
  const regex = /PT(\d+H)?(\d+M)?/;
  const matches = duration.match(regex);

  if (!matches) return duration;

  const hours = matches[1] ? matches[1].slice(0, -1) : '0';
  const minutes = matches[2] ? matches[2].slice(0, -1) : '0';

  return `${hours}H ${minutes}M`;
}
  
}
