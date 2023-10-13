import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import {CookieService} from 'ngx-cookie-service'
import { faCheck } from '@fortawesome/free-solid-svg-icons';
interface CustomFile {
  name: string;
  selectedFile: File;
  // Add other properties as needed
}
declare var $:any
@Component({
  selector: 'app-program-application',
  templateUrl: './program-application.component.html',
  styleUrls: ['./program-application.component.scss']
})

export class ProgramApplicationComponent {




  constructor(private router:Router,private authService:AuthService,private http:HttpClient,private CookieService:CookieService, private route: ActivatedRoute){}
  programId!:any
  token!:any
collegeId!:any
selectedFileValues: { [key: string]: string } = {}; // to show the selected value to user

  programFiles!:any
  applicationForm = new FormGroup({
    BachelorDegree: new FormControl(''),
    qualification: new FormControl(''),
  });

  allFiles: { inputName: string, fileData: File }[] = [];
  filesToUpload!:any
  applicationData!:any

isLoading = false
buttonLabel: string = 'ارسال';
  allUpload=false
ngOnInit()
{
  
  this.programId = this.route.snapshot.paramMap.get('id')
  this.token = this.authService.user.value.token
  this.collegeId = localStorage.getItem('collegeId')
  this.getprogramFiles()
}


  handleDegreeChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const control = this.applicationForm.get('BachelorDegree');
      if (control) {
        control.setValue(file.name);
      }
    }
  }

  handleQualificationChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const control = this.applicationForm.get('qualification');
      if (control) {
        control.setValue(file.name);
      }
    }
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

onFileSelected(event: any, file: any) {
  const selectedFile = event.target.files[0];



  if (selectedFile) {

    const fileObject = {
      inputName: file.name,
      fileData: selectedFile
    };
    this.allFiles.push(fileObject);


    this.selectedFileValues[file.name] = selectedFile.name;

    console.log(this.selectedFileValues)


    if (Object.keys(this.selectedFileValues).length === this.programFiles.data.programFiles.length) // disable submit btn until user upload all files
    {

        this.allUpload = true
    }
    // Store the selected file's value (e.g., file name) in the selectedFileValues object
    // this.selectedFileValues[file.name] = selectedFile.name;
    // this.selectedFileValues['file'] = selectedFile;


 
    console.log(this.allFiles)

    console.log(`Uploading ${selectedFile.name} `);

  }
}



onFormSubmit()  {
  this.isLoading = true
  let headers= new HttpHeaders({
    'Authorization': `Bearer ${this.token}`
  })
 
 
   this.http.post(`https://commerce-api-dev.onrender.com/api/v1/applicant/collages/${this.collegeId}/programs/${this.programId}/applications`,
  {}
  ,
  {headers}
  ).subscribe(data=>
  {
    console.log(data)
    this.applicationData = data
    this.filesToUpload = this.applicationData.data.filesToUpload
    
   
    this.handle()





 


    
  
  },
  err=>
  {
    console.log(err)
  })

 


}


handle()
{
 


  for(let file of this.filesToUpload )
  {
        const myFileObject = this.allFiles.find((response:any) => response.inputName === file.name);
    console.log(myFileObject,file)
     
      if (myFileObject) {
        const uploadUrl = file.uploadUrl;

         let headers= new HttpHeaders({
       

          'Content-Type': `${myFileObject.fileData.type}`
      
        })


        // console.log(uploadUrl,value,fileObject.type,)

        
          // Create a FormData object and append the selected file
          //  const formData = new FormData();
          //  formData.append('file', value);


        this.http.put(uploadUrl,myFileObject.fileData,{ headers, observe: 'response' }
        ).subscribe(data=>
        {
          console.log(data)
        
            let dataaa= data
            if (dataaa.status === 200) {
              // Handle success here
              console.log('Upload successful.');
            } else {
              // Handle other status codes or errors here
              console.log('Upload failed. Status Code:', dataaa.status);
            }
        

            
                    // Check if this is the last iteration of the loop
            if (file === this.filesToUpload[this.filesToUpload.length - 1]) {

              this.isLoading = false
              // Navigate the user after the loop has completed
              this.router.navigate(['/applicant/MyApplications'])
              console.log('all end')
            }
        
        },
        err=>
        {
          console.log(err)
        })





      }


  }

}



// handle()
// {
//   for (const key in this.selectedFileValues) {
//     if (this.selectedFileValues.hasOwnProperty(key)) {
//       const value = this.selectedFileValues[key];
//       console.log(`Key: ${key}, Value: ${value}`);

//       // Find the file object with a matching name in the response's filesToUpload array
//       const fileObject = this.filesToUpload.find((file:any) => file.name === key);


//       console.log(this.selectedFileValues,this.filesToUpload)

//       if (fileObject) {
//         const uploadUrl = fileObject.uploadUrl;
//         console.log(`Upload URL for ${key}: ${uploadUrl}`);

//          let headers= new HttpHeaders({
       

//           'Content-Type': `${fileObject.type}`
      
//         })


//         console.log(uploadUrl,value,fileObject.type,)

        
//           // Create a FormData object and append the selected file
//           //  const formData = new FormData();
//           //  formData.append('file', value);


//         this.http.put(uploadUrl,value,{ headers, observe: 'response' }
//         ).subscribe(data=>
//         {
//           console.log(data)
        
//             let dataaa= data
//             if (dataaa.status === 200) {
//               // Handle success here
//               console.log('Upload successful.');
//             } else {
//               // Handle other status codes or errors here
//               console.log('Upload failed. Status Code:', dataaa.status);
//             }
        
          
        
//         },
//         err=>
//         {
//           console.log(err)
//         })





//       }
//     }
//   }

// }



}
