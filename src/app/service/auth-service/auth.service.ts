import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticateRequest } from 'src/app/dto/authenticate-request';
import { StorageService } from '../storage-service/storage.service';
import { UserInfo } from 'src/app/model/user-info';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiServerUrl = environment.apiServerUrl;

  /* USER INFO VARIABLES */
  userInfo: UserInfo = new UserInfo(0, '', false);
  userInfoBehavior = new BehaviorSubject<UserInfo>(this.userInfo);
  userInfoStatus = this.userInfoBehavior.asObservable();
  /* END USER INFO VARIABLES */

  constructor(private http: HttpClient, private storageService: StorageService, private router: Router) { }

  sendLoginRequest(authenticateRequest: AuthenticateRequest): Observable<any> {
    return this.http.post(this.apiServerUrl + '/auth/authenticate', authenticateRequest);
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(
      this.apiServerUrl + '/auth/register',
      {
        name,
        email,
        password
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    this.storageService.clean();
    this.userInfo.isAutheticated = false;
    this.changeUserInfoStatus(this.userInfo);
    this.router.navigate([`/`]);
    return this.http.post(this.apiServerUrl + '/auth/signout', {}, httpOptions);
  }

  isTheUserLogged(): boolean{
    return this.storageService.isLoggedIn();
  }

  changeUserInfoStatus(userInfo: UserInfo) {
    console.log('changeUserInfoStatus(userInfo: UserInfo)', userInfo);
    this.userInfoBehavior.next(userInfo);
  }

  public getId(): any {
    return this.storageService.getId();
  }

  public getEmail(): any {
    return this.storageService.getEmail();
  }
}
