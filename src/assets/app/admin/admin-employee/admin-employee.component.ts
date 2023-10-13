import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

declare var $:any

@Component({
  selector: 'app-admin-employee',
  templateUrl: './admin-employee.component.html',
  styleUrls: ['./admin-employee.component.scss']
})
export class AdminEmployeeComponent implements OnInit{
  constructor(private http:HttpClient,private authService:AuthService,private router:Router, private route: ActivatedRoute,private CookieService:CookieService){}
 
  token =this.authService.user.value.token
 
  removeEmployeeIndex = -1
  UpdatEmployeeIndex!:any
  employeeData!:any
  isLoading= true
  collegeId!:any
  adminProfile!:any
  updateEmployee!:any
  err!:any




  pages: number[] = []; // Define the pages array in your component class

  currentPage: number = 1; // Current page
pageLimit: number = 12;  // Number of items per page
totalItems: number = 0; // Total number of items (you'll update this value with the response)
totalPages: number = Math.ceil(this.totalItems / this.pageLimit);






  @ViewChild('editEmployeeSelect') editEmployeeSelect!: ElementRef;
  @ViewChild('removeEmployeeSelect') removeEmployeeSelect!: ElementRef;


  addEmployee = new FormGroup({
    name: new FormControl('',Validators.required),
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',Validators.required),
  })

  updateEmployeeForm = new FormGroup({
    name: new FormControl(null,),
    email: new FormControl(null,Validators.email),
    password: new FormControl(null),
  })
  ngAfterContentChecked() {
   
    // to reset form when use close update modal
    if(this.employeeData != undefined)
    {
      console.log(this.employeeData)
      $('#updateEmploye').on('hidden.bs.modal',  (e: any) => {
        this.updateEmployeeForm.reset();
        this.editEmployeeSelect.nativeElement.value = null;
    
    
      })
      $('#updateEmploye').on('show.bs.modal', () => {
       
        // Reset the <select> element to its initial value
        this.editEmployeeSelect.nativeElement.value = null;
    });
         
           $('#addEmployee').on('hidden.bs.modal',  (e: any) => {
              this.addEmployee.reset();
             this.editEmployeeSelect.nativeElement.value = null;
             console.log('ssssssssss')
     
          })
          $('#deleteEmploye').on('hidden.bs.modal',  (e: any) => {
             this.addEmployee.reset();
            this.removeEmployeeSelect.nativeElement.value = null;
         })
    
      
    }


  }
  ngOnInit(): void {
   
    this.collegeId = localStorage.getItem('collegeId')
    this.showEmployee()
    
  }
  
  createEmployee(value:any)
  {
    const headers= new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
    
    return this.http.post(`https://commerce-api-dev.onrender.com/api/v1/admin/collages/${this.collegeId}/employees`,value,{headers}).subscribe(data=>
    {
     
      console.log('program added')
      $('#addEmployee').modal('hide')
      this.showEmployee()
      this.addEmployee.reset();
    },
    err=>
    {
      console.log(err)
    })
  }

  showEmployee(page:number = 1){
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${this.token}`

    })
    

    return this.http.get(`https://commerce-api-dev.onrender.com/api/v1/admin/collages/${this.collegeId}/employees`,
    {
      headers,
      params:{
     
        limit: this.pageLimit.toString(),
        page:page

      }
    
    }).subscribe(data=>{
    
    
    this.employeeData = data
      console.log(this.employeeData);
      
    this.totalItems = this.employeeData.data.count; // Update the total number of items
    console.log(this.totalItems);

     // Recalculate totalPages based on the updated totalItems
  this.totalPages = Math.ceil(this.totalItems / this.pageLimit);

  this.updatePages();


    console.log(data);
    this.isLoading = false
    },
    
    err=>
    {
      this.isLoading = false
      this.employeeData = undefined
      console.log(err)
    }
    )
  }

  navigateToParentComponent()
    {
      this.router.navigate(['../'], { relativeTo: this.route });
      console.log(this.route)
    }
  onSubmit(){
    console.log(this.addEmployee.value);
    this.createEmployee(this.addEmployee.value)
    
  }
  onEmployeeSelectChange(SelectedIndex:any){
    console.log(SelectedIndex,this.employeeData.data);
    
    this.updateEmployee = this.employeeData.data.employees[SelectedIndex]
    console.log(this.updateEmployee)
    this.updateEmployeeForm.patchValue({
      name:this.updateEmployee.name,
      email:this.updateEmployee.email,
      // password:this.updateEmployee.password
    })
    
  }


  updateEmployees(){
    console.log(this.updateEmployeeForm.value)
    const headers= new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })

    const SelectEmployeId = this.employeeData.data.employees[this.UpdatEmployeeIndex].id
      console.log(this.addEmployee.value)

    // Filter out the form controls with null values
      const filledFormValues = Object.entries(this.updateEmployeeForm.value)
      .filter(([key, value]) => value !== null)
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
      console.log(filledFormValues)
    return this.http.patch(`https://commerce-api-dev.onrender.com/api/v1/admin/collages/${this.collegeId}/employees/${SelectEmployeId}`,filledFormValues,{headers}).subscribe(data=>
    {
      console.log(data)
    

      $('#updateEmploye').modal('hide')
      this.showEmployee()
     
      
    
    },
    err=>
    {
      console.log(err)
    })

    }


  deleteEmployee(){
    const headers= new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
    
    

    const SelectEmployeId = this.employeeData.data.employees[this.removeEmployeeIndex].id;

    
    
    return this.http.delete(`https://commerce-api-dev.onrender.com/api/v1/admin/collages/${this.collegeId}/employees/${SelectEmployeId}`,{headers}).subscribe(data=>
    {
      console.log(data)
      $('#deleteEmploye').modal('hide')
      this.showEmployee()
    
    },
    err=>
    {
      console.log(err)
    })

  }







 // Create a function to handle page changes:
 onPageChange(newPage: number): void {
  if (newPage >= 1 && newPage <= this.totalPages) {
    this.currentPage = newPage;
    this.showEmployee(this.currentPage)
    this.updatePages();
  }
}



// Add this function to generate the pages array
updatePages(): void {
  this.pages = [];
  for (let i = 1; i <= this.totalPages; i++) {
    this.pages.push(i);
  }
}
}

