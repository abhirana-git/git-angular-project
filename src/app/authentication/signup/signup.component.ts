import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignupModel } from '../../model/user.model';
import { SignupService } from '../../service/signup.service';
import { UrlSetupConfigService } from '../../service/url-setup-config.service';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  constructor(private signupService:SignupService, private apiurlsetup:UrlSetupConfigService) {
  }
  ngOnInit(): void {

    this.apiurlsetup.setApiUrl('Auth/signup');
}
  signupdetails=signal<SignupModel|undefined>(undefined);
  signup=new FormGroup({
    firstname:new FormControl('', {
      validators:[Validators.required]
    }),
    lastname: new FormControl('',{
      validators:[Validators.required]
    }),
    password: new FormControl('', {
      validators:[Validators.required]
    }),
    confirmpassword: new FormControl('',{
      validators:[Validators.required]
    }),
    email: new FormControl('',{
      validators: [Validators.required]
    })
  })

  Submit(){
    const model=this.signup.value as SignupModel;
    model.fullname = model.lastname.concat(', ', model.firstname);
    this.signupService.createUser(model)
    .subscribe({
      next: (val) => this.signupdetails.set(val)
      
    });
    this.signup.reset();
  }
}
