import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';
const USER_ID = 'user-id';
const USER_EMAIL = 'user-email';
@Injectable({
  providedIn: 'root'
})
export class StorageService {


  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));

    window.sessionStorage.removeItem(USER_ID);
    window.sessionStorage.setItem(USER_ID, JSON.stringify(user.id));

    window.sessionStorage.removeItem(USER_EMAIL);
    window.sessionStorage.setItem(USER_EMAIL, JSON.stringify(user.email));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public getId(): any {
    const id = window.sessionStorage.getItem(USER_ID);
    if (id) {
      return JSON.parse(id);
    }

    return {};
  }

  public getEmail(): any {
    const email = window.sessionStorage.getItem(USER_EMAIL);
    if (email) {
      return JSON.parse(email);
    }

    return {};
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }
}
