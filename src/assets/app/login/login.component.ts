import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
emailErr!:any
passErr!:any
generalErr!:any
roleErr!:any
  constructor(private authService:AuthService){}
  isLoading=true
  login = new FormGroup(
    {
      role: new FormControl('applicant',[Validators.required]),
      email: new FormControl('',Validators.required),
      password: new FormControl('',[Validators.required])
    })
  
    onSubmit()
    {
    this.isLoading=false

      console.log(this.login.value)
      this.authService.login(this.login.value).subscribe(data=>
        {
        
          this.emailErr=undefined
          this.passErr=undefined

          this.isLoading=true
        },
        err=>
        {
        //  if( err.error.message == 'Invalid email.')
        //  {
        //   this.emailErr = 'خطأ في البريد الإلكتروني'
        //   this.passErr=undefined
        //   this.roleErr=undefined
          
        //   this.isLoading=true
        //  }else if(err.error.message == 'Could not authenticate master.')
        // {
        //   this.passErr =  'خطأ في كلمه المرور '
        //   this.emailErr=undefined
        //   this.roleErr=undefined

        //   this.isLoading=true
        // }else
        // {
        //   this.roleErr = 'خطأ'
        //   this.isLoading=true
        //   this.emailErr=undefined
        //   this.passErr=undefined
        // }
         this.generalErr = 'خطأ في الدخول'
            this.isLoading=true
        })
   
    }

}
