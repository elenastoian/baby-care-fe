import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetAllBabiesResponse } from 'src/app/dto/get-all-babies-response';
import { environment } from 'src/environments/environment';
import { StorageService } from '../storage-service/storage.service';

@Injectable({
  providedIn: 'root'
})
export class BabyService {

  private apiServerUrl = environment.apiServerUrl;

  constructor(private storageService: StorageService, private http: HttpClient) { }

  getAllBabies(): Observable<GetAllBabiesResponse[]> {

    let user = this.storageService.getUser();
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + user.token
    });

    return this.http.get<GetAllBabiesResponse[]>(`${this.apiServerUrl}/baby/all`, { headers: headers });
  }
}
