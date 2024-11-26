import { Component, OnInit, signal } from '@angular/core';
import { AuthenticateService } from '../../service/authenticate.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../../model/user.model';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(private auth:AuthenticateService) {
  }
  userDetails = signal<UserModel|undefined>(undefined);
  ngOnInit(): void {

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
      next: (user) => {
        if (user) {
          this.userDetails.set(user); 
          this.auth.login(user.id);
          console.log('login component', user.id) 
          this.loginForm.reset();
        } else {
          alert('Wrong email or password entered. Try Again!!');
        }
      },
      error: (err) => {
        console.error('Error fetching user details:', err);
        alert('An error occurred. Please try again later.');
      }
    });
  }
}  