import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-deploms',
  templateUrl: './deploms.component.html',
  styleUrls: ['./deploms.component.scss']
})
export class DeplomsComponent {
  token!: any;
  err!: any;
  collegeId!: any;
  deplomsData!: any;
  constructor(private  http:HttpClient,private authService:AuthService,private router:Router,private CookieService:CookieService, private route: ActivatedRoute){}
 
  ngOnInit(): void {

    this.collegeId = localStorage.getItem('collegeId')
    this.token =this.authService.user.value.token
    this.showDeplomsData()
     
   }
   clickHere(){
    const deplomaId = this.route.snapshot.paramMap.get('id');
    
    
    this.router.navigate([`/employee/empHome/${deplomaId}/showStudents`]);
  }
  
   
  //  clickHere(index:any){
  //   const id= this.deploms.data.programs[index].id

  //   console.log(id);

  //   this.router.navigate(['/employee/empHome',id])
    
  //  }


  showDeplomsData(){
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${this.token}`
    })
    
    const programsId =  this.route.snapshot.paramMap.get('id')
    return this.http.get(`https://commerce-api-dev.onrender.com/api/v1/employee/collages/${this.collegeId}/programs/${programsId}`, {headers}).subscribe(data=>{
      console.log(data);
      
      this.deplomsData = data
      this.err = undefined
    },
    err=>{
      if(err.error.message=='No deploms found')
      {
        this.err = err.error.message
        this.deplomsData = undefined
        console.log(this.err)
      }else
      {
        console.log(this.err.error.message)
      }
    
    }
    )
  }
}
