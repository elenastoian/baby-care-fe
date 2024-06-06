import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ParentModel } from '../model/parent';
import { UserInfo } from '../model/user-info';
import { AuthService } from '../service/auth-service/auth.service';
import { ParentRegistrationService } from '../service/parent-registration-service/parent-registration.service';
import { SaveParentResponse } from '../dto/save-parent-response';
import { SaveParentRequest } from '../dto/save-parent-request';
import { ParentRegistrationForm } from '../model/parent-registration-form';
import { SexEnum } from '../model/sex-senum';

interface selectSex {
  sex: string;
  code: string;
}

@Component({
  selector: 'app-parent-registration',
  templateUrl: './parent-registration.component.html',
  styleUrl: 'parent-registration.component.css' 
})
export class ParentRegistrationComponent implements OnInit, OnDestroy {

  date1: Date | undefined;

  selectSexArray: selectSex[] | undefined;

  selectSex: selectSex | undefined;

  userInfo: UserInfo = new UserInfo(0, '', false);

  /* ROUTE VARIABLES */
  userId: number = 0;
  /* END ROUTE VARIABLES */

  /* PPARENT VARIABLES */
  parent: ParentModel;
  /* END PARENT VARIABLES */

  /* FORM */
  parentRegistrationForm: ParentRegistrationForm = new ParentRegistrationForm('', null, null, '');
  /* END FORM */

   /* SUBSCRIPTION */
   private parentRegistrationServiceSubscription: Subscription;
   private activateRouteSubscription: Subscription;
   private userInfoStatusSubscription: Subscription;
   /* END SUBSCRIPTION */

   constructor(
    private activateRoute: ActivatedRoute,
    private parentRegistrationService: ParentRegistrationService,
    private router: Router,
    private authService: AuthService) { }

    ngOnInit(): void {

      this.selectSexArray = [
        { sex: 'Male', code: 'MALE' },
        { sex: 'Female', code: 'FEMALE' }
    ];

      console.log("Started parent-registration OnInit.")
      
      this.activateRouteSubscription = this.activateRoute.params.subscribe();
  
      this.userInfoStatusSubscription = this.authService.userInfoStatus.subscribe((userInfo: UserInfo) => {
        this.userInfo = userInfo;
        console.log("UserInfo updated:", this.userInfo);
      });
    }
  
    saveParent(): void {
      if(this.selectSex.code == 'MALE') {
        this.parentRegistrationForm.sex== SexEnum.MALE
      }
      if(this.selectSex.code == 'MALE') {
        this.parentRegistrationForm.sex== SexEnum.MALE
      }
      if(this.date1 != null) {
        this.parentRegistrationForm.dateOfBirth = this.date1;
      }
        let saveParentRequest: SaveParentRequest = new SaveParentRequest(
          this.parentRegistrationForm.name,
          this.parentRegistrationForm.dateOfBirth,
          this.parentRegistrationForm.sex,
          this.parentRegistrationForm.location
        )
  
        this.parentRegistrationServiceSubscription = this.parentRegistrationService.saveParent(saveParentRequest).subscribe(
          (response: SaveParentResponse) => {
            this.router.navigate(['/profile']); // Navigate to profile after successful registration
          },
          (error) => {
            console.error("Error saving parent", error);
            //add pop up
          }
        );
    }

    ngOnDestroy(): void {
      if (this.parentRegistrationServiceSubscription) {
        this.parentRegistrationServiceSubscription.unsubscribe();
      }
  
      if (this.activateRouteSubscription) {
        this.activateRouteSubscription.unsubscribe();
      }
  
      if (this.userInfoStatusSubscription) {
        this.userInfoStatusSubscription.unsubscribe();
      }
    }
  }
