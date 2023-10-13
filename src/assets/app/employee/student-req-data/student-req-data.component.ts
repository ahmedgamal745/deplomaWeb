import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-student-req-data',
  templateUrl: './student-req-data.component.html',
  styleUrls: ['./student-req-data.component.scss']
})
export class StudentReqDataComponent {
  token!: any;
  err!: any;
  collegeId!: any;
 
  applicationData!: any;
  constructor(private  http:HttpClient,private authService:AuthService,private router:Router,private CookieService:CookieService, private route: ActivatedRoute){}
 

  updateAppForm= new FormGroup(
    {
      status : new FormControl(),
      program_fees_status : new FormControl(),
      applying_fees_status: new FormControl(),
      feedback:new FormControl(null)
      
    })
  ngOnInit(): void {
  
    this.collegeId = localStorage.getItem('collegeId')
    this.token =this.authService.user.value.token
    this.showapplication()
    
     
   }


  showapplication(){
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${this.token}`
    })
    const appId =  this.route.snapshot.paramMap.get('studentId')
    console.log(appId);
    
    const programsId =  this.route.snapshot.paramMap.get('id')
    return this.http.get(`https://commerce-api-dev.onrender.com/api/v1/employee/collages/${this.collegeId}/programs/${programsId}/applications/${appId}`, {headers}).subscribe(data=>{
      console.log(data);
      
      
      this.applicationData = data

      this.updateAppForm.patchValue({
        status: this.applicationData.data.application.status,
        program_fees_status : `${this.applicationData.data.application.program_fees_status}`,
        applying_fees_status : `${this.applicationData.data.application.applying_fees_status}`,
        feedback : this.applicationData.data.application.feedback
      })
      this.err = undefined
    },
    err=>{
      if(err.error.message=='No deploms found')
      {
        this.err = err.error.message
        this.applicationData = undefined
        console.log(this.err)
      }else
      {
        console.log(this.err.error.message)
      }
    
    }
    )
  }


  updateApplication(){
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${this.token}`
    })
    const appId =  this.route.snapshot.paramMap.get('studentId')
    console.log(appId);
    console.log(this.updateAppForm.value);
    
    const programsId =  this.route.snapshot.paramMap.get('id')

    const filteredFormValues = Object.entries(this.updateAppForm.value)
  .filter(([key, value]) => value !== null && value !== "")
  .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
  console.log(filteredFormValues);
  
    // // Filter out the form controls with null values
    // const filledFormValues = Object.entries(this.updateAppForm.value)
    // .filter(([key, value]) => value !== null || value !== "")
    // .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
    // console.log(filledFormValues)


    return this.http.patch(`https://commerce-api-dev.onrender.com/api/v1/employee/collages/${this.collegeId}/programs/${programsId}/applications/${appId}`,filteredFormValues, {headers}).subscribe(data=>{
      console.log(data);
      this.showapplication()
      this.router.navigate(['../'], { relativeTo: this.route });
      this.err = undefined
    },
    err=>{
      
    console.log(err);
    
    }
    )
  }
}
