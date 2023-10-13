import { Component, ElementRef, ViewChild } from '@angular/core';
import { MasterService } from '../../master.service';
import { AuthService } from 'src/app/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
declare var $:any

@Component({
  selector: 'app-create-admins',
  templateUrl: './create-admins.component.html',
  styleUrls: ['./create-admins.component.scss']
})
export class CreateAdminsComponent {
  removeAdmin = -1
  editAdmin!:any
  UpdateAdmin!:any
  collageId!:any
  token !:any
  isLoading = true 
  colleges!:any
  admiins!:any
  err!:any
  
  addAdminForm= new FormGroup(
    {
      name: new FormControl('',Validators.required),
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',Validators.required),
      // universityName: new FormControl('',[Validators.required])
    })

    updateAdminForm= new FormGroup(
      {
        name: new FormControl(null,),
        email: new FormControl(null,Validators.email),
        password: new FormControl(null),
        // universityName: new FormControl('',[Validators.required])
      })


    @ViewChild('updateAdminSelect') updateAdminSelect!: ElementRef;
    @ViewChild('removeAdminSelect') removeAdminSelect!: ElementRef;


  constructor(private masterService:MasterService,private http:HttpClient,private authService:AuthService,private router:Router, private route: ActivatedRoute){}
  ngOnInit(): void {
  //  this.authService.getCookies()
   this.token =this.authService.user.value.token

    this.showAdmin()
  }
  ngAfterContentChecked()
  {
    if(this.admiins !=undefined)
    {
      setTimeout(() => {
        $('#addAdmin').on('hidden.bs.modal', () => {
            this.addAdminForm.reset();
            this.updateAdminForm.reset();
            this.updateAdminSelect.nativeElement.value = null;
  
            // Reset the <select> element to its initial value
        });
  
        $('#updateAdmin').on('hidden.bs.modal', () => {
            this.addAdminForm.reset();
            this.updateAdminForm.reset();
            // Reset the <select> element to its initial value
            this.updateAdminSelect.nativeElement.value = null;
        });
        $('#updateAdmin').on('show.bs.modal', () => {
       
          // Reset the <select> element to its initial value
          this.updateAdminSelect.nativeElement.value = null;
      });
  
        $('#deleteAdmin').on('hidden.bs.modal', () => {
          this.addAdminForm.reset();
          this.updateAdminForm.reset();
          // Reset the <select> element to its initial value
          this.removeAdminSelect.nativeElement.value = null;
      });

      $('#deleteAdmin').on('show.bs.modal', () => {
     
        // Reset the <select> element to its initial value
        this.removeAdminSelect.nativeElement.value = null;
    });
    }, 1500); // Delay for 1 second
  
    }
  }


  
  CLICK(index:any){
    const CollegeId = this.colleges.data[index].id;
    console.log(CollegeId);
  }
  
  createAdmin(value:any)
  {
      
      
    const headers= new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
    
    this.collageId = this.route.snapshot.paramMap.get('id')
    
    
    
    return this.http.post(`https://commerce-api-dev.onrender.com/api/v1/master/collages/${this.collageId}/admins`,value,{headers}).subscribe(data=>
    {
      console.log(data)
      $('#addAdmin').modal('hide')
      $('#updateAdmin').modal('hide')
      this.showAdmin()
    
    },
    err=>
    {
      console.log(err)
    }
    )
  }
  showAdmin(){
    
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${this.token}`
    })
    this.collageId = this.route.snapshot.paramMap.get('id')
    return this.http.get(`https://commerce-api-dev.onrender.com/api/v1/master/collages/${this.collageId}/admins`, {headers}).subscribe(data=>{
      this.admiins = data
      this.isLoading = false
      this.err = undefined
    
      console.log(this.admiins)
      
      
    },
    err=>{
      if(err.error.message=='No admins found')
      {
        this.err = err.error.message
        this.isLoading=false
        this.admiins = undefined
        console.log(this.err)
      }else
      {
        console.log(this.err.error.message)
      }
    
    }
    )
  }
  deleteAdmin() {
    const headers= new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
    // Access the selected value using this.removeCollegeIndex
    console.log('Selected Index:', this.removeAdmin);

    const selectedCollegeId = this.admiins.data.admins[this.removeAdmin].id;
    this.collageId = this.route.snapshot.paramMap.get('id')
    return this.http.delete(`https://commerce-api-dev.onrender.com/api/v1/master/collages/${this.collageId}/admins/${selectedCollegeId}`,{headers}).subscribe(data=>
    {
      console.log(data)
      $('#deleteAdmin').modal('hide')
      this.showAdmin()
    
    },
    err=>
    {
      console.log(err)
    })

  }

 
  onAdminsSelectionChange(selectedIndex:any){
    console.log(selectedIndex);
    
    this.editAdmin = this.admiins.data.admins[selectedIndex]

  //   this.adminForm.patchValue({
  //     name: this.editAdmin.name,
  //     email:this.editAdmin.email,
  //     password: this.editAdmin.password

  //  });
  }
 
  updateAdmins(){
    console.log(this.updateAdminForm.value)
    const headers= new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
    this.collageId = this.route.snapshot.paramMap.get('id')

    const formValues = this.updateAdminForm.getRawValue();
    console.log(formValues)

    // Filter out the form controls with null values
    const filledFormValues = Object.entries(formValues)
      .filter(([key, value]) => value !== null)
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
      console.log(filledFormValues)


    return this.http.patch(`https://commerce-api-dev.onrender.com/api/v1/master/collages/${this.collageId}/admins/${this.editAdmin.id}`,filledFormValues,{headers}).subscribe(data=>
    {
      console.log(data)
      $('#updateAdmin').modal('hide')
      this.showAdmin()
   

    },
    err=>
    {
      console.log(err)
    })
  }

  navigateToParentComponent()
  {
    this.router.navigate(['../../'], { relativeTo: this.route });

  }

   
  onSubmitAdd(){
 

    this.createAdmin(this.addAdminForm.value)
  }
  
}
