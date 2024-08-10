import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageService } from '../storage-service/storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SleepRecordResponse } from 'src/app/dto/sleep-record-response';
import { ScreenTimeRecordResponse } from 'src/app/dto/screen-time-record-response';
import { FeedRecordResponse } from 'src/app/dto/feed-record-response';

@Injectable({
  providedIn: 'root'
})
export class BabyTrackerService {

  private apiServerUrl = environment.apiServerUrl;

  constructor(private storageService: StorageService, private http: HttpClient) { }

  getAllSleepRecords(babyId: number): Observable<SleepRecordResponse[]> {
    let user = this.storageService.getUser();
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + user.token
    });

    return this.http.get<SleepRecordResponse[]>(`${this.apiServerUrl}/sleep/get-all/baby/${babyId}`, { headers: headers });
 
  }


  getAllScreenTimeRecords(babyId: number): Observable<ScreenTimeRecordResponse[]> {
    let user = this.storageService.getUser();
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + user.token
    });

    return this.http.get<ScreenTimeRecordResponse[]>(`${this.apiServerUrl}/screen/get-all/baby/${babyId}`, { headers: headers });
 
  }

  getAllFeedRecords(babyId: number): Observable<FeedRecordResponse[]> {
    let user = this.storageService.getUser();
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + user.token
    });

    return this.http.get<FeedRecordResponse[]>(`${this.apiServerUrl}/feed/get-all/baby/${babyId}`, { headers: headers });
 
  }
}
