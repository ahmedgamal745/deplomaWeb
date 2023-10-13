import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-all-applications',
  templateUrl: './all-applications.component.html',
  styleUrls: ['./all-applications.component.scss']
})
export class AllApplicationsComponent {
 
  constructor(private router:Router,private route:ActivatedRoute, private authService:AuthService,private CookieService:CookieService, private http:HttpClient){}

  @ViewChild('selectProgram') selectProgram!: ElementRef;

  token!:any
  collegeId!:any
  applications!:any
  allPrograms!:any
  programIndex!:any
  isLoading = false
  formattedSDate!:any;
  formattedUpdatedDate!:any

  selectedAppDetials!:any
  selectedProgramId!:any
  ngOnInit()
  {


    this.token =  this.authService.user.value.token
    this.collegeId = localStorage.getItem('collegeId')
    this.programIndex = 0
    this.getAllPorgrams()
  console.log('sdsd')
  }


  getAllPorgrams()
  {
    this.isLoading = true
    const headers= new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
    
    
    
    return this.http.get(`https://commerce-api-dev.onrender.com/api/v1/applicant/collages/${this.collegeId}/programs`,{headers}).subscribe(data=>
    {
     console.log(data)
      this.allPrograms = data
      console.log(this.allPrograms.data.programs)




      this.selectedProgramId = this.allPrograms.data.programs[this.programIndex].id
      this.getAllApplications(this.selectedProgramId)
      
      // this.isLoading = false
   
    },
    err=>
    {
      
      
        this.isLoading = false
        this.allPrograms = undefined
        console.log(err)
      
    
    
    })
  }

  getAllApplications(programId:any)
  {
   
    const headers= new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
    return this.http.get(`https://commerce-api-dev.onrender.com/api/v1/applicant/collages/${this.collegeId}/programs/${programId}/applications`,{headers}).subscribe(data=>
    {
      this.applications = data
      console.log(this.applications)
      this.isLoading = false
    //   const dateStr = this.applications.created_at;
    //   const dateEnd = this.applications.updated_at;
    //   const StartdateObject = new Date(dateStr);
    //   const enddateObject = new Date(dateEnd);
      
    //   // Format the date as 'yyyy-MM-dd' for input[type="date"]
    //  this.formattedSDate = StartdateObject.toISOString().split('T')[0];
    //    this.formattedUpdatedDate = enddateObject.toISOString().split('T')[0];

       console.log(this.formattedSDate,this.formattedUpdatedDate);
       

    },
    err=>
    {
      this.isLoading = false
      this.applications = undefined
      console.log(err)
    }
    
    )
  }




  onProgramSelectionChange(programIndex:any)
  {

    console.log(programIndex)
    this.isLoading = true
     this.selectedProgramId = this.allPrograms.data.programs[programIndex].id
    console.log(this.selectedProgramId)
    this.getAllApplications(this.selectedProgramId)
  }

  navigateToParentComponent()
    {
      this.router.navigate(['../'], { relativeTo: this.route });
      console.log(this.route)
    }


    openApplicationDetails(index:number)
    {
        const selectedApplicationId = this.applications.data.applications[index].id

        // this.router.navigate(['/applicant/MyApplications', selectedApplicationId])
      this.getApplicationDetails(selectedApplicationId)
    }


    getApplicationDetails(appId:any)
    {
      const headers= new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
      return this.http.get(`https://commerce-api-dev.onrender.com/api/v1/applicant/collages/${this.collegeId}/programs/${this.selectedProgramId}/applications/${appId}`,{headers}).subscribe(data=>
      {
        this.selectedAppDetials = data
        console.log(this.selectedAppDetials)
        this.isLoading = false
      //   const dateStr = this.applications.created_at;
      //   const dateEnd = this.applications.updated_at;
      //   const StartdateObject = new Date(dateStr);
      //   const enddateObject = new Date(dateEnd);
        
      //   // Format the date as 'yyyy-MM-dd' for input[type="date"]
      //  this.formattedSDate = StartdateObject.toISOString().split('T')[0];
      //    this.formattedUpdatedDate = enddateObject.toISOString().split('T')[0];
  
       
         
  
      },
      err=>
      {
        this.isLoading = false
        this.selectedAppDetials= undefined
        console.log(err)
      }
      
      )
    }

}
