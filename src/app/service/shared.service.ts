import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private datasharing = new BehaviorSubject<any>(null);
  data$ = this.datasharing.asObservable();
  constructor() { }

  setdata(data:any){
    this.datasharing.next(data);
  }

  getdata(){
    this.datasharing.getValue();
  }
}
