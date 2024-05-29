import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { StorageService } from "../storage-service/storage.service";
import { GetParentResponse } from "src/app/dto/get-parent-response";
import { UpdateParentRequest } from "src/app/dto/update-parent-request";
import { SaveParentResponse } from "src/app/dto/save-parent-response";

@Injectable({
  providedIn: 'root'
})
export class ParentService {


  private apiServerUrl = environment.apiServerUrl;

  constructor(private storageService: StorageService, private http: HttpClient) { }

  findParentByUser(): Observable<GetParentResponse> {

    let user = this.storageService.getUser();
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + user.token
    });

    return this.http.get<GetParentResponse>(`${this.apiServerUrl}/parent`, { headers: headers });
  }

  updateParent(updateParentRequest: UpdateParentRequest): Observable<SaveParentResponse> {
  
    let user = this.storageService.getUser();

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + user.token
    });

    return this.http.put<SaveParentResponse>(`${this.apiServerUrl}/parent/update`, updateParentRequest, { headers: headers });
  }
}