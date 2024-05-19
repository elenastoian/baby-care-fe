import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../storage-service/storage.service';
import { environment } from 'src/environments/environment';
import { ResendConfirmationEmailRequest } from 'src/app/dto/resend-confirmation-email-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResendConfirmationEmailService {

  private apiServerUrl = environment.apiServerUrl;

  constructor(private http: HttpClient, private storageService: StorageService) { }

  sendResendConfirmationEmailService(resendConfirmationEmailRequest: ResendConfirmationEmailRequest): Observable<ResendConfirmationEmailRequest>{
    var user = this.storageService.getUser();

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + user.token
    });

    return this.http.post<ResendConfirmationEmailRequest>(`${this.apiServerUrl}/settings/resend-confirmation-email`, resendConfirmationEmailRequest, { headers: headers });
}

}
