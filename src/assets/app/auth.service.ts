import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from './user.model';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>({} as User);
  loggedIn= new BehaviorSubject<boolean>(false);
  testData = new BehaviorSubject<object>({})
  
  myProfileData!:any
  userName!:any
  adminProfile!:any
  masterProifle!:any
  applicantProfile!:any
  employeeProfile!:any
  tokenExpirationTimer!:any

  constructor(private http:HttpClient ,private router:Router,private CookieService:CookieService) { }


  // login (form:any)
  // {
  //   return this.http.post('https://commerce-api-dev.onrender.com/api/v1/auth/login',form)
  //   .subscribe(
  //     data=>
  //     {
  //       console.log(data)
  //       this.handleLogin(data)
  //     },
  //     err=>
  //     {
  //       console.log(err)
  //     }
  //   )
  // }

  login (form:any)  
  {
    return this.http.post('https://commerce-api-dev.onrender.com/api/v1/auth/login',form)
    .pipe(
      tap(resData=>{
        console.log(resData)
        this.handleLogin(resData)
      })
    )
  }


  private handleLogin(resData:any)
  {
  
    console.log(resData)
    let userId= resData.data.master.id

    let userToken=resData.data.tokens

    let userRole=resData.data.master.role
    
    this.getMyProfile(userToken,userRole,userId)

    // if(userRole == 'master')
    // {
    //   this.router.navigate(['/master'])
    //   this.getMyProfile(userToken,userRole,userId)
    //   // call it to get userName first before put data in user & cookies

    // }else if (userRole == 'admin')
    // {
    //   this.router.navigate(['/admin'])
    //   this.getMyProfile(userToken,userRole,userId) // call it to get userName first before put data in user & cookies


    // }else if (userRole == 'applicant')
    // {
    //   this.router.navigate(['/applicant/program-list']);
    //   this.getMyProfile(userToken,userRole,userId) 
    // }
    //  const newUser = new User(userId,userToken,userRole,this.userName)
    //   this.user.next(newUser)


    //   this.loggedIn.next(true)

    //  this.setCookies(userToken,userId,userRole,this.userName)
    //  console.log(this.user.value)
 
    //   this.loggedIn.next(true)
    //   // this.getCookies()
    //  if(userRole == 'master')
    //  {
    //   this.router.navigate(['/master'])
    //  }else if(userRole == 'admin')
    //  {
    //   this.router.navigate(['/admin'])
    //  }

      
  }



  setCookies(token:any,id:any,role:any,userName:any,collegeId:any)
  {

   
    this.CookieService.set('id',id)
    this.CookieService.set('token',token)
    this.CookieService.set('role',role);
    this.CookieService.set('name',userName)
  
    if(this.user.value.role == 'admin' || this.user.value.role == 'applicant' || this.user.value.role == 'employee')
    {
      this.CookieService.set('collegeId',collegeId)
    }
    
    // this.getCookies()


  
  }


  autoLogin()
  {

   
    let checkToken = localStorage.getItem('token')
    let userId=localStorage.getItem('id')
    let userRole = localStorage.getItem('role')
    let userName = localStorage.getItem('name')
    console.log(checkToken,userId);
    
    if (!checkToken || !userId || !userRole || !userName) {
      return  this.logOut(); // Return or handle the case when user information is not available
    }

    const newUser = new User(userId,checkToken,userRole,userName)
    this.user.next(newUser)
    
  }

  getCookies()
  {

    
    if(this.CookieService.check('token')  )
    {
      console.log(' from get coookies',this.user.value,Object.keys(this.user.getValue()).length);
      const newUser = new User(this.CookieService.get('id'),this.CookieService.get('token'),this.CookieService.get('role'),this.CookieService.get('name'))
      this.user.next(newUser)
    
      
      console.log(this.user.value)
    }
    else
    {
      console.log('no')
      this.logOut()
    
    }
  

  
  }

  deleteCookies()
  {
    
    // this.loggedIn.next(false)

    // this.router.navigate(['/login'])
    // this.loggedIn.next(false)
    this.CookieService.deleteAll()
  }



   logOut() {
   
    
      // this.user.next(<User>({}));
      // console.log(this.CookieService.get('id'),this.CookieService.get('token'),this.CookieService.get('role'),this.CookieService.get('name'));
      // console.log(this.user.value);
      // this.CookieService.deleteAll();
      // this.router.navigate(['/login']);
      // this.loggedIn.next(false);
  
      this.user.next(<User>({}));
      localStorage.clear();
      this.router.navigate(['/login']);
   
  }
 





  getMyProfile(token:any,userRole:any,userId:any)
  {
   
    const headers= new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    
    return this.http.get(`https://commerce-api-dev.onrender.com/api/v1/${userRole}/me`,{headers}).subscribe(data=>
    {
      console.log(data)
     if(userRole == 'master')
     {
       
      
      this.masterProifle =data
      this.userName  = this.masterProifle.data.master.name

       const newUser = new User(userId,token,userRole,this.userName)
        this.user.next(newUser)
  
  
        
  
      //  this.setCookies(token,userId,userRole,this.userName,null) // no need to fourth paramter there
       


   
        this.loggedIn.next(true)





        localStorage.setItem('id', userId);
        localStorage.setItem('token', token);
        localStorage.setItem('role', userRole);
        localStorage.setItem('name', this.userName);
      
    





        this.router.navigate(['/master'])




     }else if (userRole =='admin')
     {
      this.adminProfile =data
      this.userName  = this.adminProfile.data.adminData.name

       const newUser = new User(userId,token,userRole,this.userName)
        this.user.next(newUser)
  
  
       
      const collegeId= this.adminProfile.data.adminData.collage_id
      //  this.setCookies(token,userId,userRole,this.userName,collegeId)


      localStorage.setItem('id', userId);
      localStorage.setItem('token', token);
      localStorage.setItem('role', userRole);
      localStorage.setItem('name', this.userName);
    
      localStorage.setItem('collegeId',collegeId)
       console.log(this.user.value)
   
        this.loggedIn.next(true)
        this.router.navigate(['/admin'])
      
      // this.profileAdminData = data
      // this.profileMasterData = undefined
      // this.profileLoaded=true
      // this.CookieService.set('admin-name',this.profileAdminData.data.adminData.name)
     }else if (userRole == 'applicant')
     {
      this.applicantProfile =data
      this.userName  = this.applicantProfile.data.applicant.name

       const newUser = new User(userId,token,userRole,this.userName)
        this.user.next(newUser)
  
  
        const collegeId= this.applicantProfile.data.collage.id

        console.log(collegeId)

      // const collegeId= this.applicantProfile.data.adminData.collage_id
      //  this.setCookies(token,userId,userRole,this.userName,collegeId)

      localStorage.setItem('id', userId);
      localStorage.setItem('token', token);
      localStorage.setItem('role', userRole);
      localStorage.setItem('name', this.userName);
      localStorage.setItem('collegeId',collegeId)


       console.log(this.user.value)
   
        this.loggedIn.next(true)
        this.router.navigate(['/applicant/program-list']);

      
     } else if (userRole = 'employee')
     {

      this.employeeProfile =data
      this.userName  = this.employeeProfile.data.employee.name

       const newUser = new User(userId,token,userRole,this.userName)
        this.user.next(newUser)
  
  
        const collegeId= this.employeeProfile.data.collage.id

        console.log(collegeId)

      // const collegeId= this.applicantProfile.data.adminData.collage_id
      //  this.setCookies(token,userId,userRole,this.userName,collegeId)

      localStorage.setItem('id', userId);
      localStorage.setItem('token', token);
      localStorage.setItem('role', userRole);
      localStorage.setItem('name', this.userName);
      localStorage.setItem('collegeId',collegeId)

       console.log(this.user.value)
   
        this.loggedIn.next(true)
        this.router.navigate(['/employee']);

     }
     
    },
    err=>
    {
      console.log(err)
    })

  }





  signUpApplicant (form:any)  
  {
    return this.http.post('https://commerce-api-dev.onrender.com/api/v1/auth/signup-applicant',form).subscribe(data=>
    {
      console.log(data)
      this.router.navigate(['/login'])
    },
    err=>{
      console.log(err);
      
    })
  }

  

}
