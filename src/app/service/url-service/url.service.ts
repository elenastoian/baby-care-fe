import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  previousUrl: string = '';

  /* USER INFO VARIABLES */
  previousUrlBehavior = new BehaviorSubject<string>(this.previousUrl);
  previousUrlStatus = this.previousUrlBehavior.asObservable();
  /* END USER INFO VARIABLES */

  constructor() { }

  changePreviousUrlStatus(userInfo: string) {
    this.previousUrlBehavior.next(userInfo);
  }
}
