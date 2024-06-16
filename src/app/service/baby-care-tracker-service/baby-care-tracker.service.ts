import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageService } from '../storage-service/storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BabyCareTrackerResponse } from 'src/app/dto/baby-care-tracker-reponse';

@Injectable({
  providedIn: 'root'
})
export class BabyCareTrackerService {

  private apiServerUrl = environment.apiServerUrl;

  constructor(private storageService: StorageService, private http: HttpClient) { }

  getCareTracker(babyId: number): Observable<BabyCareTrackerResponse> {
    let user = this.storageService.getUser();
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + user.token
    });

    return this.http.get<BabyCareTrackerResponse>(`${this.apiServerUrl}/track/${babyId}`, { headers: headers });
 
  }
}
