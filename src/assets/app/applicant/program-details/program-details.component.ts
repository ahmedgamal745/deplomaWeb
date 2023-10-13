import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import {CookieService} from 'ngx-cookie-service'

@Component({
  selector: 'app-program-details',
  templateUrl: './program-details.component.html',
  styleUrls: ['./program-details.component.scss']
})
export class ProgramDetailsComponent {

  constructor(private router:Router,private authService:AuthService,private http:HttpClient,private CookieService:CookieService, private route: ActivatedRoute){}

  formattedSDate!:any
  formattedEDate!:any
programId!:any
programDetails!:any
token!:any
collegeId!:any
programFiles!:any

userRole!:any
  ngOnInit()
  {
    
    this.programId = this.route.snapshot.paramMap.get('id')
    this.token = this.authService.user.value.token
    this.collegeId = localStorage.getItem('collegeId')
    console.log(this.programId)
    this.userRole  = this.authService.user.value.role
    this.getProgramDetails()
    
  }

getProgramDetails()
{
  const headers= new HttpHeaders({
    'Authorization': `Bearer ${this.token}`
  })
  return this.http.get(`https://commerce-api-dev.onrender.com/api/v1/applicant/collages/${this.collegeId}/programs/${this.programId}`
  ,{headers}
  ).subscribe(data=>

  {  
    
    this.getprogramFiles()
    console.log(data)
    this.programDetails = data
    const dateStr = this.programDetails.data.program.open_at;
    const dateEnd = this.programDetails.data.program.close_at;
    const StartdateObject = new Date(dateStr);
    const enddateObject = new Date(dateEnd);
    this.formattedSDate = StartdateObject.toISOString().split('T')[0];
    this.formattedEDate = enddateObject.toISOString().split('T')[0];
 

  },
  err=>
  {
   
    this.programDetails=undefined
 
  })
}


getprogramFiles()
{
  const headers= new HttpHeaders({
    'Authorization': `Bearer ${this.token}`
  })
  return this.http.get(`https://commerce-api-dev.onrender.com/api/v1/applicant/collages/${this.collegeId}/programs/${this.programId}/program-files`
  ,{headers}
  ).subscribe(data=>
  {
    console.log(data)
    this.programFiles = data

   //this.programFiles.data.programFiles
  },
  err=>
  {
   
    this.programFiles=undefined
 
  })
}

  openApplication(){
    this.router.navigate([`/applicant/program-list/${this.programId}/program-application`]);
  }

  showApplicantsReq()
  {
    this.router.navigate(['employee'])
  }


}
