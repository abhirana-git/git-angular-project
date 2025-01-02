import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { CommonService } from './common.service';
import { UserModel } from '../model/user.model';
import { map } from 'rxjs';
import { UrlSetupConfigService } from './url-setup-config.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService extends CommonService<UserModel> {
  constructor(httpClient: HttpClient, apiurlsetup:UrlSetupConfigService) {
    super(httpClient, apiurlsetup);
  }
  sessionTimeout: any;
  sessionDuration: number = 600000;
  userId:string|null=null;

getUserDetails(model: UserModel) {
  return this.getByCredentials(model.email, model.password).pipe(
    map((response) => (response.token ? response : null)) 
  );
}
  login(): void {
    const expirationTime = new Date().getTime() + this.sessionDuration;
      localStorage.setItem('sessionExpiration', expirationTime.toString());
    this.scheduleLogout();
  }

  private scheduleLogout(): void {
    this.sessionTimeout = setTimeout(() => {
      this.signout();
      alert('Session expired! Please log in again.');
    }, this.sessionDuration);
  }

  signout(): void {
    this.logout();
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
      this.signout();
      return false;
    }
    return true;
  }
}
