import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { BabyCareTracker } from '../model/baby-tracker';

@Component({
  selector: 'app-app.baby-tracker',
  providers: [MessageService, ConfirmationService],
  templateUrl: './app.baby-tracker.component.html',
  styleUrls: ['../../../assets/demo/badges.scss'],
  styles: [`
      :host ::ng-deep  .p-frozen-column {
          font-weight: bold;
      }

      :host ::ng-deep .p-datatable-frozen-tbody {
          font-weight: bold;
      }

      :host ::ng-deep .p-progressbar {
          height:.5rem;
      }
  `]
})
export class AppBabyTrackerComponent implements OnInit {
  trackerArray: BabyCareTracker[];
  tracker: BabyCareTracker;

  constructor(private babyCareTrackerService: BabyCareTrackerService, 
    private productService: ProductService, 
    private messageService: MessageService, 
    private confirmService: ConfirmationService, 
    private cd: ChangeDetectorRef) {}

    ngOnInit() {
      
  }
}
