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


@Component({
  selector: 'app-parent-registration',
  templateUrl: './parent-registration.component.html',
  styleUrl: 'parent-registration.component.css' 
})
export class ParentRegistrationComponent implements OnInit, OnDestroy {

  userInfo: UserInfo = new UserInfo(0, '', false);

  /* ROUTE VARIABLES */
  userId: number = 0;
  /* END ROUTE VARIABLES */

   /* VALID FORM VARIABLES */
   validFormIdMessageDisplay: boolean;

   validName: boolean = true;
   validDateOfBirth: boolean = true;
   validSex: boolean = true;
   validLocation: boolean = true;
   /* END VALID FORM VARIABLES */

  /* PPARENT VARIABLES */
  parent: ParentModel;
  /* END PARENT VARIABLES */

  /* FORM */
  parentRegistrationForm: ParentRegistrationForm = new ParentRegistrationForm('', null, null, '');
  /* END FORM */

  /* DROPDOWN VARIABLES */
  date1: Date | undefined;

  selectedSex: any = null;

  sexArray: any[] = [
      {name: 'MALE', code: 'MALE'},
      {name: 'FEMALE', value: 'FEMALE'}
  ];

  dropdownItems = [
      { name: 'MALE', code: 'MALE' },
      { name: 'FEMALE', code: 'FEMALE' }
  ];
  /* DROPDOWN VARIABLES */

   /* SUBSCRIPTION */
   private parentRegistrationServiceSubscription: Subscription;
   private activateRouteSubscription: Subscription;
   private userInfoStatusSubscription: Subscription;
   /* END SUBSCRIPTION */

   constructor(
    private activateRoute: ActivatedRoute,
    private parentRegistrationService: ParentRegistrationService,
    private router: Router,
    private authService: AuthService,
    private cdRef: ChangeDetectorRef) { }

    ngOnInit(): void {

      console.log("Started parent-registration OnInit.")
      
      this.activateRouteSubscription = this.activateRoute.params.subscribe();
  
      this.userInfoStatusSubscription = this.authService.userInfoStatus.subscribe((userInfo: UserInfo) => {
        this.userInfo = userInfo;
        console.log("UserInfo updated:", this.userInfo);
      });
    }
  
    saveParent(): void {

      if(this.selectedSex.code == 'MALE') {
        this.parentRegistrationForm.sex = SexEnum.MALE;
      }
      if(this.selectedSex.code == 'FEMALE') {
        this.parentRegistrationForm.sex = SexEnum.FEMALE;
      }

      if(this.date1 != null) {
        console.log(this.date1);
        this.parentRegistrationForm.dateOfBirth = this.date1;
      }
        let saveParentRequest: SaveParentRequest = new SaveParentRequest(
          this.parentRegistrationForm.name,
          this.parentRegistrationForm.dateOfBirth,
          this.parentRegistrationForm.sex,
          this.parentRegistrationForm.location
        )

        if(this.verifyInput(saveParentRequest) == true) {
          console.log(this.parentRegistrationForm.dateOfBirth);

        this.parentRegistrationServiceSubscription = this.parentRegistrationService.saveParent(saveParentRequest).subscribe(
          (response: SaveParentResponse) => {
            if(response.id == null) {
              console.error("Parent could not be saved.");
              //add popup
            }

            this.router.navigate(['/profile']); // Navigate to profile after successful registration
          },
          (error) => {
            console.error("Error saving parent", error);
          }
        );
      } 
    }

    verifyInput(saveParentRequest: SaveParentRequest): boolean {
      let flag = true;

      if(saveParentRequest.name == null || saveParentRequest.name == ''){
        this.validName = false;
          flag = false;
        }

        if(saveParentRequest.dateOfBirth == null) {
          this.validDateOfBirth = false;
          flag = false;
        }

        if(saveParentRequest.sex == null) {
          this.validSex = false;
          flag = false;
        }

        if(saveParentRequest.location == null || saveParentRequest.location == '') {
          this.validLocation = false;
          flag = false;
        }
      

        if (flag) {
          this.validFormIdMessageDisplay = false;
          return true;
      } else {
          this.validFormIdMessageDisplay = true;
          return false;
      }

        return flag;
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
