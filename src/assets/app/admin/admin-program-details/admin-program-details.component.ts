import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
declare var $:any
@Component({
  selector: 'app-admin-program-details',
  templateUrl: './admin-program-details.component.html',
  styleUrls: ['./admin-program-details.component.scss']
})
export class AdminProgramDetailsComponent {
  constructor(private http:HttpClient,private authService:AuthService,private router:Router, private route: ActivatedRoute,private CookieService:CookieService){}
  programId!:any
  collegeId!:any
  programDetails!:any
  formattedSDate!:any
  formattedEDate!:any
  formattedCreatedDate!:any
  formattedUpdatedDate!:any
  programFiles!:any
  isLoading = true
  token !:any
  removeFileIndex =-1

  @ViewChild('deleteFileSelect') deleteFileSelect!: ElementRef;

  addFile= new FormGroup({
    'name' : new FormControl('',[Validators.required]),
    'type': new FormControl('',[Validators.required])
  })

  ngOnInit()
  {

  
  this.token = this.authService.user.value.token

     this.programId = this.route.snapshot.paramMap.get('id');
     console.log(this.programId)
     this.collegeId = localStorage.getItem('collegeId')

     console.log(this.programId,this.collegeId)
      this.showProgramDetails()
    
  }



  ngAfterContentChecked() {
    
    if(this.programFiles !=undefined)
    {
      setTimeout(() => {
        // to reset form when use close update modal
        $('#addFile').on('hidden.bs.modal',  (e: any) => {
         // do something...
         this.addFile.reset();
   
   
      
       
       })
   
   
    //    $('#deleteFile').on('show.bs.modal', () => {
          
    //      // Reset the <select> element to its initial value
    //      this.deleteFileSelect.nativeElement.value = null;
    //  });
       $('#deleteFile').on('show.bs.modal',  (e: any) => {
         // do something...
         // this.removeFileIndex = -1
         this.deleteFileSelect.nativeElement.value = null
       
       })
      }, 1000);
    }
  
    


  }

  showProgramDetails()
  { 
    
    
    const headers= new HttpHeaders({
    'Authorization': `Bearer ${this.token}`
  })
  
  return this.http.get(`https://commerce-api-dev.onrender.com/api/v1/admin/collages/${this.collegeId}/programs/${this.programId}`
  ,{headers}
  ).subscribe(data=>
  {
   this.programDetails = data
    console.log(data)

    const dateStr = this.programDetails.data.program.open_at;
    const dateEnd = this.programDetails.data.program.close_at;
    const StartdateObject = new Date(dateStr);
    const enddateObject = new Date(dateEnd);

    // Format the date as 'yyyy-MM-dd' for input[type="date"]
    this.formattedSDate = StartdateObject.toISOString().split('T')[0];
    this.formattedEDate = enddateObject.toISOString().split('T')[0];


    const dateCreated = this.programDetails.data.program.created_at;
    const dateUpdated = this.programDetails.data.program.updated_at;
    const createddateObject = new Date(dateCreated);
    const updatedateObject = new Date(dateUpdated);

    // Format the date as 'yyyy-MM-dd' for input[type="date"]
    this.formattedCreatedDate = createddateObject.toISOString().split('T')[0];
    this.formattedUpdatedDate = updatedateObject.toISOString().split('T')[0];





    this. showProgramFiles()
  
   
  },
  err=>
  {
    console.log(err)
  })

  }



  showProgramFiles()
  {
    const headers= new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
    return this.http.get(`https://commerce-api-dev.onrender.com/api/v1/admin/collages/${this.collegeId}/programs/${this.programId}/program-files`
    ,{headers}
    ).subscribe(data=>
    {
      console.log(data)
      this.programFiles = data
      this.isLoading = false
     //this.programFiles.data.programFiles
    },
    err=>
    {
     
      this.programFiles=undefined
      this.isLoading = false
   
    })
  }



  UploadFile()
  {
    console.log(   this.addFile.value);

    const headers= new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
    return this.http.post(`https://commerce-api-dev.onrender.com/api/v1/admin/collages/${this.collegeId}/programs/${this.programId}/program-files`,
    this.addFile.value

    ,{headers}
    ).subscribe(data=>
    {
      console.log(data)
      this.showProgramDetails()
      $('#addFile').modal('hide')
    },
    err=>
    {
      console.log(err)
    })
    
  }


  deleteFile()
  {
  
    const fileId= this.programFiles.data.programFiles[this.removeFileIndex].id

   
    const headers= new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
    // Access the selected value using this.removeCollegeIndex
 ;

    
    return this.http.delete(`https://commerce-api-dev.onrender.com/api/v1/admin/collages/${this.collegeId}/programs/${this.programId}/program-files/${fileId}`,{headers}).subscribe(data=>
    {
      console.log(data)
      $('#deleteFile').modal('hide')
      this.showProgramDetails()
    
    },
    err=>
    {
      console.log(err)
    })
  
    }

    navigateToParentComponent()
    {
      this.router.navigate(['../'], { relativeTo: this.route });
      console.log(this.route)
    }

  
}
