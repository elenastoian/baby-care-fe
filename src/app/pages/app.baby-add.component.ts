import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserInfo } from '../model/user-info';
import { AuthService } from '../service/auth-service/auth.service';
import { BabyAddForm } from '../model/baby-add-form';
import { BabyModel } from '../model/baby';
import { BabyAddService } from '../service/baby-add-service/baby-add.service';
import { SaveBabyRequest } from '../dto/save-baby-request';
import { SexEnum } from '../model/sex-senum';
import { SaveBabyResponse } from '../dto/save-baby-response';
import { TypeOfBirthEnum } from '../model/type-of-birth-enum';

@Component({
  selector: 'app-app.baby-add',
  templateUrl: './app.baby-add.component.html',
  styleUrl: './app.baby-add.component.css'
})
export class AppBabyAddComponent implements OnInit, OnDestroy {
  userInfo: UserInfo = new UserInfo(0, '', false);

  /* ROUTE VARIABLES */
  userId: number = 0;
  /* END ROUTE VARIABLES */

   /* VALID FORM VARIABLES */
   validFormIdMessageDisplay: boolean;

   validName: boolean = true;
   validDateOfBirth: boolean = true;
   validSex: boolean = true;
   validTypeOfBirth: boolean = true;
   /* END VALID FORM VARIABLES */

  /* PPARENT VARIABLES */
  baby: BabyModel;
  /* END PARENT VARIABLES */

  /* FORM */
  babyAddForm: BabyAddForm = new BabyAddForm('', null, null, 0, 0, null, 0, '');
  /* END FORM */

 
  date1: Date | undefined;

   /* SEX DROPDOWN VARIABLES */
  selectedSex: any = null;

  sexArray: any[] = [
      {name: 'MALE', code: 'MALE'},
      {name: 'FEMALE', value: 'FEMALE'}
  ];

  dropdownItemsSex = [
      { name: 'Male', code: 'MALE' },
      { name: 'Female', code: 'FEMALE' }
  ];
  /* SEX DROPDOWN VARIABLES */

  /* TYPE OF BIRTH DROPDOWN VARIABLES */
  selectedTypeOfBirth: any = null;

  TypeOfBirthArray: any[] = [
      {name: 'NATURAL_BIRTH', code: 'NATURAL_BIRTH'},
      {name: 'CAESAREAN_BIRTH', value: 'CAESAREAN_BIRTH'},
      { name: 'WATER_BIRTH', code: 'WATER_BIRTH' },
      { name: 'OTHER', code: 'OTHER' }
  ];

  dropdownItemsTypeOfBirth = [
      { name: 'Natural birth', code: 'NATURAL_BIRTH' },
      { name: 'Caesarean birth', code: 'CAESAREAN_BIRTH' },
      { name: 'Water birth', code: 'WATER_BIRTH' },
      { name: 'Other', code: 'OTHER' }
  ];
  /* TYPE OF BIRTH DROPDOWN VARIABLES */

   /* SUBSCRIPTION */
   private babyAddServiceSubscription: Subscription;
   private activateRouteSubscription: Subscription;
   private userInfoStatusSubscription: Subscription;
   /* END SUBSCRIPTION */

   constructor(
    private activateRoute: ActivatedRoute,
    private babyAddService: BabyAddService,
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

      this.assignValuesFromDropdown();

        let saveBabyRequest: SaveBabyRequest = new SaveBabyRequest(
          this.babyAddForm.name,
          this.babyAddForm.dateOfBirth,
          this.babyAddForm.sex,
          this.babyAddForm.weight,
          this.babyAddForm.height,
          this.babyAddForm.typeOfBirth,
          this.babyAddForm.birthWeight,
          this.babyAddForm.comments
        )

        if(this.verifyInput(saveBabyRequest) == true) {

        this.babyAddServiceSubscription = this.babyAddService.saveBaby(saveBabyRequest).subscribe(
          (response: SaveBabyResponse) => {
            if(response.id == null) {
              console.error("Baby could not be saved.");
              //add pop up
            }

            this.router.navigate(['/baby/', response.id]); // Navigate to profile after successful registration
          },
          (error) => {
            console.error("Error saving baby", error);
          }
        );
      } 
    }

    assignValuesFromDropdown() {
      if(this.date1 != null) {
        console.log(this.date1);
        this.babyAddForm.dateOfBirth = this.date1;
      }

      if(this.selectedSex.code == 'MALE') {
        this.babyAddForm.sex = SexEnum.MALE;
      }
      if(this.selectedSex.code == 'FEMALE') {
        this.babyAddForm.sex = SexEnum.FEMALE;
      }

      if(this.selectedTypeOfBirth.code == 'NATURAL_BIRTH') {
        this.babyAddForm.typeOfBirth = TypeOfBirthEnum.NATURAL_BIRTH;
      }
      if(this.selectedTypeOfBirth.code == 'CAESAREAN_BIRTH') {
        this.babyAddForm.typeOfBirth = TypeOfBirthEnum.CAESAREAN_BIRTH;
      }
      if(this.selectedTypeOfBirth.code == 'WATER_BIRTH') {
        this.babyAddForm.typeOfBirth = TypeOfBirthEnum.WATER_BIRTH;
      }
      if(this.selectedTypeOfBirth.code == 'OTHER') {
        this.babyAddForm.typeOfBirth = TypeOfBirthEnum.OTHER;
      }
    }

    verifyInput(saveBabyRequest: SaveBabyRequest): boolean {
      let flag = true;

      if(saveBabyRequest.name == null || saveBabyRequest.name == ''){
        this.validName = false;
          flag = false;
        }

        if(saveBabyRequest.dateOfBirth == null) {
          this.validDateOfBirth = false;
          flag = false;
        }

        if(saveBabyRequest.sex == null) {
          this.validSex = false;
          flag = false;
        }

        if(saveBabyRequest.typeOfBirth == null) {
          this.validTypeOfBirth = false;
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
      if (this.babyAddServiceSubscription) {
        this.babyAddServiceSubscription.unsubscribe();
      }
  
      if (this.activateRouteSubscription) {
        this.activateRouteSubscription.unsubscribe();
      }
  
      if (this.userInfoStatusSubscription) {
        this.userInfoStatusSubscription.unsubscribe();
      }
    }
}
