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
import { BabyCareTracker } from '../model/baby-tracker';

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

    babyCareTrackerArray: BabyCareTrackerResponse[] = [];

    babyCareTracker: BabyCareTracker = new BabyCareTracker(0, null, null, null, null, null);

    selectedBabyCareTrackerArray!: BabyCareTracker[] | null;

    submitted: boolean = false;

  // ...................... //
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
        this.babyId = params.babyId;
    });
  
      this.userInfoStatusSubscription = this.authService.userInfoStatus.subscribe((userInfo: UserInfo) => {
        this.userInfo = userInfo;
        console.log("UserInfo updated:", this.userInfo);
        this.cdRef.detectChanges();  // ensure changes are detected
      });

      this.babyCareTrackerSubscription = this.babyCareTrackerService.getCareTracker(this.babyId).subscribe(
        (response: BabyCareTrackerResponse[]) => {

          console.log("Baby tracker response:", response);
          // this.babyCareTracker.id = response.id;
          // this.babyCareTracker.date = response.date;
          // this.sleepRecordArray = response.sleepRecords;
          // this.stoolRecordArray = response.stoolRecords;
          // this.feedRecordArray = response.feedRecords;
          this.babyCareTrackerArray = response;
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

openNew() {
  this.babyCareTracker = new BabyCareTracker(0, null, null, null, null, null);
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

editTrack(track: BabyCareTrackerResponse) { //change it with request obj
  // this.babyCareTracker = { ...track };
  this.trackDialog = true;
}
deleteTrack(product: BabyCareTrackerResponse) {
  // this.confirmationService.confirm({
  //     message: 'Are you sure you want to delete ' + product.name + '?',
  //     header: 'Confirm',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {
  //         this.products = this.products.filter((val) => val.id !== product.id);
  //         this.product = {};
  //         this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
  //     }
  // });
}

hideDialog() {
  this.trackDialog = false;
  this.submitted = false;
}

saveTrack() {
  this.submitted = true;

  // if (this.babyCareTracker.name?.trim()) {
  //     if (this.product.id) {
  //         this.products[this.findIndexById(this.product.id)] = this.product;
  //         this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
  //     } else {
  //         this.product.id = this.createId();
  //         this.product.image = 'product-placeholder.svg';
  //         this.products.push(this.product);
  //         this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
  //     }

  //     this.babyCareTrackerArray = [...this.babyCareTrackerArray];
  //     this.productDialog = false;
  //     this.babyCareTracker = {};
  // }
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
