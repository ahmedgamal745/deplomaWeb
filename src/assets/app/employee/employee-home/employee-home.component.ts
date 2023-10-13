import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.scss']
})
export class EmployeeHomeComponent implements OnInit{
  token!: any;
  err!: any;
  collegeId!: any;
  deploms!: any;
  constructor(private  http:HttpClient,private authService:AuthService,private router:Router,private CookieService:CookieService, private route: ActivatedRoute){}
  ngOnInit(): void {
  
    this.collegeId = localStorage.getItem('collegeId')
    this.token =this.authService.user.value.token
 
     this.showDeploms()
   }

   clickHere(index:any){
    const id= this.deploms.data.programs[index].id

    console.log(id);

    this.router.navigate(['/employee/empHome',id])
    
   }


  showDeploms(){
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${this.token}`
    })
    
    
    return this.http.get(`https://commerce-api-dev.onrender.com/api/v1/employee/collages/${this.collegeId}/programs`, {headers}).subscribe(data=>{
      console.log(data);
      
      this.deploms = data
      this.err = undefined
    },
    err=>{
      if(err.error.message=='No deploms found')
      {
        this.err = err.error.message
        this.deploms = undefined
        console.log(this.err)
      }else
      {
        console.log(this.err.error.message)
      }
    
    }
    )
  }
}
