import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SendConfirmationTokenRequest } from 'src/app/dto/send-confirmation-token-request';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailConfirmationService {

  
  private apiServerUrl = environment.apiServerUrl;

  constructor(private http: HttpClient) { }


  sendConfirmationTokenRequest(token: string): Observable<SendConfirmationTokenRequest> {
    return this.http.get<SendConfirmationTokenRequest>(`${this.apiServerUrl}/auth/confirm?token=${token}`);
  }
}
