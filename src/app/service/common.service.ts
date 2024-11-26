import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export class CommonService<T>  {
  baseurl: string;

  constructor(private httpclient: HttpClient, name: string) 
  {
    this.baseurl =`http://localhost:3000/${name}`
  }

  getAll(): Observable<T[]> {
    return this.httpclient.get<T[]>(this.baseurl);
  }

  add(model: T): Observable<T> {
    return this.httpclient.post<T>(this.baseurl, model);
  }

  getById(id: number|string): Observable<T> {
    return this.httpclient.get<T>(`${this.baseurl}/${id}`);
  }

  put(model: T): Observable<T> {
    return this.httpclient.put<T>(this.baseurl, model);
  }

  getByCredentials(email: string, password: string): Observable<T[]> {
    return this.httpclient.get<T[]>(`${this.baseurl}?email=${email}&password=${password}`);
  }
}
