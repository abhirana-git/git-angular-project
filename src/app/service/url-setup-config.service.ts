import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlSetupConfigService {
private apiUrl:string = '';
  constructor() { }
get dynamicurl(){
return this.apiUrl;
}

setApiUrl(url:string){
this.apiUrl = url;
}
}
