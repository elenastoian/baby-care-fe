import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { RecoveryAccountRequest } from 'src/app/dto/recovery-account-request';
import { PasswordRecoveryRequest } from 'src/app/dto/password-recovery-request';
import { ResetPasswordRequest } from 'src/app/dto/reset-password-request';
import { ValidatePasswordTokenRequest } from 'src/app/dto/validate-reset-password-token';


@Injectable({
  providedIn: 'root'
})
export class RecoveryService {


  private apiServerUrl = environment.apiServerUrl;

  constructor(private http: HttpClient) { }

  sendPasswordRecoveryEmail(passwordRecoveryRequest: PasswordRecoveryRequest) {

    return this.http.post(`${this.apiServerUrl}/settings/recover-password`, passwordRecoveryRequest);
  }

  validateToken(validatePasswordTokenRequest: ValidatePasswordTokenRequest): Observable<ValidatePasswordTokenRequest> {

    return this.http.post<ValidatePasswordTokenRequest>(`${this.apiServerUrl}/settings/validate-token`, validatePasswordTokenRequest);
  }

  sendPasswordReset(resetPasswordRequest: ResetPasswordRequest): Observable<ResetPasswordRequest> {

    return this.http.put<ResetPasswordRequest>(`${this.apiServerUrl}/settings/change-password`, resetPasswordRequest);
  }

  sendAccountRecoveryEmail(recoveryAccountRequest: RecoveryAccountRequest): Observable<RecoveryAccountRequest> {
    return this.http.post<RecoveryAccountRequest>(`${this.apiServerUrl}/settings/recover-account`, recoveryAccountRequest);
  }
}
