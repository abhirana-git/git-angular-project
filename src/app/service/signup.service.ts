import { Injectable } from "@angular/core";
import { CommonService } from "./common.service";
import { SignupModel } from "../model/user.model";
import { HttpClient } from "@angular/common/http";
import { UrlSetupConfigService } from "./url-setup-config.service";


@Injectable({
    providedIn: 'root',
})
export class SignupService extends CommonService<SignupModel>{

constructor(httpClient:HttpClient, apiurlsetup:UrlSetupConfigService) {
    super(httpClient, apiurlsetup);
}

createUser(model:SignupModel){
    return this.add(model);
}

getAllUsers(){
    return this.getAll();
}

}