import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AppMainComponent} from './app.main.component';
import {AppNotfoundComponent} from './pages/app.notfound.component';
import {AppErrorComponent} from './pages/app.error.component';
import {AppAccessdeniedComponent} from './pages/app.accessdenied.component';
import {AppLoginComponent} from './pages/app.login.component';
import { AppRegisterComponent } from './pages/app.register.component';
import { EmailConfirmationComponent } from './pages/email-confirmation.component';
import { RecoveryAccountComponent } from './pages/recovery-account.component';
import { RecoveryEmailSentConfirmationComponent } from './pages/recovery-email-sent-confirmation.component';
import { RecoveryMailConfirmationComponent } from './pages/recovery-mail-confirmation.component';
import { RecoveryPasswordComponent } from './pages/recovery-password.component';
import { RegistrationConfirmationComponent } from './pages/registration-confirmation.component';
import { ResendConfirmationEmailComponent } from './pages/resend-confirmation-email.component';
import { ResetPasswordConfirmationComponent } from './pages/reset-password-confirmation.component';
import { ResetPasswordFailedComponent } from './pages/reset-password-failed.component';
import { ResetPasswordComponent } from './pages/reset-password.component';
import { HomeComponent } from './pages/home.component';
import { AuthGuardService } from './service/auth-guard-service/auth-guard.service';
import { ParentComponent } from './pages/app.parent.component';
import { AppBabiesComponent } from './pages/app.babies.component';
import { ParentRegistrationComponent } from './pages/parent-registration.component';


@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppMainComponent,
                children: [
                     /* Protected */
                     { path: 'profile', component: ParentComponent, canActivate: [AuthGuardService], title: 'Baby Care' },
                     { path: 'babies', component: AppBabiesComponent, canActivate: [AuthGuardService], title: 'Baby Care' },
                     { path: 'parent/register', component: ParentRegistrationComponent, canActivate: [AuthGuardService], title: 'Baby Care' },
                     /* End Protected */

                     /* NOT Protected */
                     { path: '', component: HomeComponent, title: 'Baby Care' },
                     { path: 'login', component: AppLoginComponent, title: 'Baby Care' },
                     { path: 'register', component: AppRegisterComponent, title: 'Baby Care' },
                     { path: 'password-recovery', component: RecoveryPasswordComponent, title: 'Baby Care' },
 
                     { path: 'password-reset', component: ResetPasswordComponent, title: 'Baby Care' },
                     { path: 'password-recovery-confirmation', component: ResetPasswordConfirmationComponent, title: 'Baby Care' },
                     { path: 'password-recovery-failed', component: ResetPasswordFailedComponent, title: 'Baby Care' },
                    
                     { path: 'account-recovery', component: RecoveryAccountComponent, title: 'Baby Care' },
                     { path: 'recovery-email-confirmation', component: RecoveryMailConfirmationComponent, title: 'Baby Care' },
 
                     { path: 'sign-up-confirmation', component: RegistrationConfirmationComponent, title: 'Baby Care'},
                     { path: 'email-confirmation', component: EmailConfirmationComponent, title: 'Baby Care' },
 
                     { path: 'resend-confirmation-email', component: ResendConfirmationEmailComponent, title: 'Baby Care' },
                     { path: 'resend-confirmation-email-confirmation', component: RecoveryEmailSentConfirmationComponent, title: 'Baby Care' }
 
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
