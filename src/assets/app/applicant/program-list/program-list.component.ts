import { Component } from '@angular/core';
import { ApplicantServiceService } from '../applicant-service.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-program-list',
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.scss']
})
export class ProgramListComponent {
token!:any
  programList:any
  filteredProgramList:any
  collegeId!:any
  isLoading = true
  constructor(private appService:ApplicantServiceService , private router:Router,private authService:AuthService,private http:HttpClient,private CookieService:CookieService){}
  ngOnInit()
  {
    // this.authService.getCookies()
    this.collegeId = localStorage.getItem('collegeId')
    this.token = this.authService.user.value.token
    this.getAllPrograms()
    // this.programList = this.appService.programList
    // this.filteredProgramList = [...this.programList];
  }




  showProgramDetails(index:number)
  {

    const selectedProgramId = this.programList.data.programs[index].id
    console.log(selectedProgramId)
    this.router.navigate(['applicant/program-list', selectedProgramId])
  }

  searchProgram(value: any) {

   
 
    let objectAsString = value.value.toString();



    if (typeof objectAsString === 'string') {
      objectAsString = objectAsString.toLowerCase();

     
        this.filteredProgramList = this.programList.filter((program: string) =>
            program.toLowerCase().includes(objectAsString)
        );
      console.log(this.filteredProgramList)
    
    }
}


getAllPrograms()
{
  const headers= new HttpHeaders({
    'Authorization': `Bearer ${this.token}`
  })
  
    let userRole = this.authService.user.value.role
  console.log(userRole)
   

  
      return this.http.get(`https://commerce-api-dev.onrender.com/api/v1/applicant/collages/${this.collegeId}/programs`,{headers}).subscribe(data=>
      {
       console.log(data)
        this.programList = data
        console.log(this.programList.data.programs)
        this.isLoading = false
       
      },
      err=>
      {
        
        
          this.isLoading = false
          this.programList = undefined
          console.log(err)
        
      
      
      })


   
    

    }

  
}

  // searchProgram(value:any)
  // {
   
    
 
  //   // console.log(this.filteredProgramList)

  //   this.filteredProgramList = this.programList.filter((program:any) =>
  //       program.toLowerCase().includes(value)
  //   );

  //   console.log(this.filteredProgramList)
  // }

