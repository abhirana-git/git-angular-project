import { Component, OnInit, signal } from '@angular/core';
import { AuthenticateService } from '../../service/authenticate.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../../model/user.model';
import { UrlSetupConfigService } from '../../service/url-setup-config.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(private auth:AuthenticateService, private apiurlsetup:UrlSetupConfigService,
    private router:Router
  ) {
  }
  userDetails = signal<UserModel|undefined>(undefined);
  ngOnInit(): void {

      this.apiurlsetup.setApiUrl('Auth/Login');
  }

  loginForm=new FormGroup({
    email: new FormControl('', {
      validators:[Validators.required]
    }),
    password: new FormControl('',{
      validators:[Validators.required]
    }),
    rememberme: new FormControl(false)
  })

  Login() {
    const userModel: UserModel = this.loginForm.value as UserModel;
  
    this.auth.getUserDetails(userModel).subscribe({
      next: (response: any) => {
        console.log('API Response:', response);
        if (response && response.token) {
          localStorage.setItem('authToken', response.token);
          this.auth.login();
          this.router.navigate(['recipe/list']);
          this.loginForm.reset();
        } else {
          alert('Unexpected response from the server.');
        }
      },
      error: (err) => {
        if (err.status === 400 || err.status === 401) {
          alert(err.error.Message || 'Invalid email or password.');
        } else {
          alert('An error occurred. Please try again later.');
        }
      },
    });
  }  
}  