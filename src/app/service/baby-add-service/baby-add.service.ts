import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SaveBabyRequest } from 'src/app/dto/save-baby-request';
import { SaveBabyResponse } from 'src/app/dto/save-baby-response';
import { environment } from 'src/environments/environment';
import { StorageService } from '../storage-service/storage.service';

@Injectable({
  providedIn: 'root'
})
export class BabyAddService {

  private apiServerUrl = environment.apiServerUrl;

  constructor(private storageService: StorageService, private http: HttpClient) { }

  saveBaby(saveBabyRequest: SaveBabyRequest): Observable<SaveBabyResponse> {
    console.log("Start to save parent.");
    console.log("SaveParentRequest:");
    console.log(saveBabyRequest);

    let user = this.storageService.getUser();
    
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + user.token
    });

    return this.http.post<SaveBabyResponse>(`${this.apiServerUrl}/baby/save`, saveBabyRequest, { headers: headers });
  }
}
