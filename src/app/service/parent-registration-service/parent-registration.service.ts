import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageService } from '../storage-service/storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SaveParentResponse } from 'src/app/dto/save-parent-response';
import { SaveParentRequest } from 'src/app/dto/save-parent-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParentRegistrationService {

  
  private apiServerUrl = environment.apiServerUrl;

  constructor(private storageService: StorageService, private http: HttpClient) { }

  saveParent(saveParentRequest: SaveParentRequest): Observable<SaveParentResponse> {

    let user = this.storageService.getUser();
    
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + user.token
    });

    return this.http.post<SaveParentResponse>(`${this.apiServerUrl}/parent/save`, saveParentRequest, { headers: headers });
  }

}
