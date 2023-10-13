import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
 
  signUpForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8), // Minimum length of 8 characters
      Validators.maxLength(15), // Maximum length of 15 characters
      // Requires at least one letter and one number
    ]),
    national_id: new FormControl('',[Validators.required,  Validators.pattern(/^[0-9]{14}$/)]),
    gender: new FormControl('',[Validators.required])
  })
  constructor(private http:HttpClient ,private router:Router,private authService:AuthService){}


  submit()
  
  {
    console.log(this.signUpForm.value)
    this.authService.signUpApplicant(this.signUpForm.value)
  }
}
