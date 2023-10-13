import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss']
})
export class MyprofileComponent {

  constructor(private authService:AuthService, private http:HttpClient, private CookieService:CookieService){}
   token!:any
  //  userRole= this.authService.user.value.role
  userRole!:any
profileLoaded=true
profileMasterData!:any
profileAdminData!:any
profileApplicantData!:any
profileEmployeeData!:any

  test:any
   ngOnInit()
   {
    // this.getMyProfile()
    // this.authService.getCookies()

 
    this.userRole = this.authService.user.value.role
    this.token = this.authService.user.value.token
    this.getMyProfile()
  
   }

  getMyProfile()
  {
    const headers= new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
    
    return this.http.get(`https://commerce-api-dev.onrender.com/api/v1/${this.userRole}/me`,{headers}).subscribe(data=>
    {
      console.log(data)
      this.userRole = this.authService.user.value.role

      console.log(this.userRole)
  
      if(this.userRole == 'master')
      {
        this.profileMasterData = data
        console.log(this.profileMasterData,this.userRole)
      }else if (this.userRole == 'admin')
      {
        this.profileAdminData = data
        console.log(this.profileAdminData,this.userRole)
  
      }else if (this.userRole == 'applicant')
      {
        this.profileApplicantData = data
        console.log(this.profileApplicantData,this.userRole)
  
      }else if (this.userRole == 'employee')
      {
        this.profileEmployeeData = data
  
      }
     
     
    },
    err=>
    {
      console.log(err)
    })

  }
}
