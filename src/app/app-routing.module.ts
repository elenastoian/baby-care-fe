import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AppMainComponent} from './app.main.component';
import {AppNotfoundComponent} from './shared/app-not-found/app.notfound.component';
import {AppErrorComponent} from './shared/error/app.error.component';
import {AppAccessdeniedComponent} from './shared/access-denied/app.accessdenied.component';
import {AppLoginComponent} from './shared/login/app.login.component';
import { AppRegisterComponent } from './shared/register/app.register.component';
import { RegistrationConfirmationComponent } from './shared/registration-confirmation/registration-confirmation.component';
import { ResendConfirmationEmailComponent } from './shared/email-confirmation/resend-confirmation-email.component';
import { HomeComponent } from './features/home/home.component';
import { AuthGuardService } from './service/auth-guard-service/auth-guard.service';
import { ParentComponent } from './features/parent/app.parent.component';
import { ParentRegistrationComponent } from './features/parent-registration/parent-registration.component';
import { AppBabyAddComponent } from './features/babies-add/app.baby-add.component';
import { AppBabiesTrackerComponent } from './features/babies-tracker/app.babies-tracker.component';
import { AppBabyTrackerComponent } from './features/baby-tracker/app.baby-tracker.component';
import { AppBabiesComponent } from './features/babies/app.babies.component';
import { AppBabyComponent } from './features/baby/app.baby.component';
import { EmailConfirmationComponent } from './shared/email-confirmation/email-confirmation.component';
import { AppContactComponent } from './features/contact/app.contact.component';


@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppMainComponent,
                children: [
                     /* Protected */
                     { path: 'profile', component: ParentComponent, canActivate: [AuthGuardService], title: 'Baby Care' },
                     { path: 'parent/register', component: ParentRegistrationComponent, canActivate: [AuthGuardService], title: 'Baby Care' },
                     { path: 'babies', component: AppBabiesComponent, canActivate: [AuthGuardService], title: 'Baby Care' },
                     { path: 'baby/add', component: AppBabyAddComponent, canActivate: [AuthGuardService], title: 'Baby Care' },
                     { path: 'baby/:id', component: AppBabyComponent, canActivate: [AuthGuardService], title: 'Baby Care' },
                     { path: 'track', component: AppBabiesTrackerComponent, canActivate: [AuthGuardService], title: 'Baby Care' },
                     { path: 'track/:babyId', component: AppBabyTrackerComponent, canActivate: [AuthGuardService], title: 'Baby Care' },
                     
                     /* End Protected */

                     /* NOT Protected */
                     { path: '', component: HomeComponent, title: 'Baby Care' },
                     { path: 'login', component: AppLoginComponent, title: 'Baby Care' },
                     { path: 'register', component: AppRegisterComponent, title: 'Baby Care' },
            
 
                     { path: 'sign-up-confirmation', component: RegistrationConfirmationComponent, title: 'Baby Care'},
                     { path: 'email-confirmation', component: EmailConfirmationComponent, title: 'Baby Care' },
 
                     { path: 'resend-confirmation-email', component: ResendConfirmationEmailComponent, title: 'Baby Care' },

                     { path: 'contact', component: AppContactComponent, title: 'Baby Care' }
 
                ]
            },
            {path: 'error', component: AppErrorComponent},
            {path: 'access', component: AppAccessdeniedComponent},
            {path: 'notfound', component: AppNotfoundComponent},
            {path: '**', redirectTo: '/notfound'},
        ], {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
