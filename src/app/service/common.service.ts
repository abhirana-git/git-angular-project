import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UrlSetupConfigService } from './url-setup-config.service';
import { ApiResponse } from '../model/recipe.model';

export class CommonService<T> {
  private baseurl: string;

  constructor(private httpclient: HttpClient, private apiurlsetup: UrlSetupConfigService) {
       this.baseurl = `https://localhost:44349/api/`; 
  }

  private getBaseUrl(): string {
    return `https://localhost:44349/api/${this.apiurlsetup.dynamicurl}`;
  }

  getAll(): Observable<T[]> {
    return this.httpclient.get<ApiResponse<T[]>>(this.getBaseUrl()).pipe(  
      map((response) => response._data),
      catchError(this.handleError)
    );
  }

  add(model: T): Observable<T> {
    return this.httpclient.post<T>(this.getBaseUrl(), model).pipe(
      catchError(this.handleError)
    );
  }

  getById(id: number | string): Observable<T> {
    return this.httpclient.get<ApiResponse<T>>(`${this.getBaseUrl()}/${id}`).pipe(
      map((response) => (response._data)), 
      catchError(this.handleError)
    );
  }

  put(model: T): Observable<T> {
    return this.httpclient.put<T>(this.getBaseUrl(), model).pipe(
      catchError(this.handleError)
    );
  }

  getByCredentials(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.httpclient.post<any>(this.getBaseUrl(), body).pipe(
      catchError(this.handleError)
    );
  }

  logout(){
    return this.httpclient.post(this.baseurl+'Auth/logout', null).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong, please try again later.'));
  }
}
