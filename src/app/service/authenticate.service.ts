import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { UserModel } from '../model/user.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService extends CommonService<UserModel> {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'users');
  }
  sessionTimeout: any;
  sessionDuration: number = 300000;
  userId:string|null=null;

  getUserDetails(model: UserModel) {
    return this.getByCredentials(model.email, model.password).pipe(
      map((users) => (users.length > 0 ? users[0] : null))
    );
  }

  login(userId: string): void {
    const expirationTime = new Date().getTime() + this.sessionDuration;
    if (userId != undefined) {
      localStorage.setItem('userId', userId);
      localStorage.setItem('sessionExpiration', expirationTime.toString());
    }

    this.scheduleLogout();
  }

  private scheduleLogout(): void {
    this.sessionTimeout = setTimeout(() => {
      this.logout();
      alert('Session expired! Please log in again.');
    }, this.sessionDuration);
  }

  logout(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('sessionExpiration');
    if (this.sessionTimeout) {
      clearTimeout(this.sessionTimeout);
    }
  }

  isLoggedIn(): boolean {
    const expiration = localStorage.getItem('sessionExpiration');
    this.userId = localStorage.getItem('userId');
    if (!expiration) return false;

    const now = new Date().getTime();
    if (now > +expiration) {
      this.logout();
      return false;
    }
    return true;
  }
}
