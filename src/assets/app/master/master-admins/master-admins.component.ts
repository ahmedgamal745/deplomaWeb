import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { MasterService } from '../master.service';

@Component({
  selector: 'app-master-admins',
  templateUrl: './master-admins.component.html',
  styleUrls: ['./master-admins.component.scss']
})
export class MasterAdminsComponent implements OnInit{
  token =this.authService.user.value.token
  collegesLoad = false
  colleges!:any
  err!:any
  constructor(private masterService:MasterService,private http:HttpClient,private authService:AuthService,private router:Router, private route: ActivatedRoute){}
  ngOnInit(): void {
    this.showColleges()
  }
  clickHere(index:any){
    const id= this.colleges.data.collages[index].id
    console.log(id);
    
    this.router.navigate(['/master/admins',id])
  }
  
  showColleges(){
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${this.token}`
    })

    return this.http.get('https://commerce-api-dev.onrender.com/api/v1/master/collages/', {headers}).subscribe(data=>{

 
    
      this.colleges = data
      this.collegesLoad = true
      this.err = undefined

      
    },
    err=>{
      this.err = err.error.message
      this.collegesLoad=true
    }
    )
  }

}
