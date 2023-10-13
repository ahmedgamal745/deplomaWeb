import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

import { CookieService } from 'ngx-cookie-service';
import { User } from '../user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  arrowIconClass = 'fas fa-arrow-left';

  loggedIn = false
  userName!:any
  userRole!:any


  constructor(private authService:AuthService,private cookiesService:CookieService,private router:Router){}

  ngOnInit()
  {
    console.log(this.cookiesService.get('id'),this.cookiesService.get('token'),this.cookiesService.get('role'),this.cookiesService.get('name'));
      console.log(this.authService.user.value);
 

    this.authService.user.subscribe(data=>
     {
      console.log(data)
 
      if (Object.keys(this.authService.user.getValue()).length !== 0) {
        // `user` variable contains values
        // Perform your logic here
        this.authService.user.subscribe(data=>
          {
            this.userName =data.name
            this.userRole = data.role
          })
        this.loggedIn=true

         console.log(data)


      } else {
        // `user` variable does not contain values
        // Perform your logic here
       
         this.loggedIn=false
      }
     })

  
     // this.authService.getCookies()
    // this.authService.user.subscribe(data=>
    //   {
    //     if (Object.keys(this.authService.user.getValue()).length !== 0) {
    //       // `user` variable contains values
    //       // Perform your logic here
    //       this.authService.user.subscribe(data=>
    //         {
    //           this.userName =data.name
    //           this.userRole = data.role
    //         })
    //       this.loggedIn=true
  
    //        console.log('helloooo')
  
  
    //     } else {
    //       // `user` variable does not contain values
    //       // Perform your logic here
    //       console.log('nooooooo')
    //       this.authService.getCookies()
    //        this.loggedIn=false
    //     }
    //   })




    // // this.authService.getCookies()
    // this.authService.user.subscribe(data=>
    //   {
    //     if (Object.keys(this.authService.user.getValue()).length !== 0) {
    //       // `user` variable contains values
    //       // Perform your logic here
    //       this.authService.user.subscribe(data=>
    //         {
    //           this.userName =data.name
    //           this.userRole = data.role
    //         })
    //       this.loggedIn=true
  
    //        console.log('helloooo')
  
  
    //     } else {
    //       // `user` variable does not contain values
    //       // Perform your logic here
    //       console.log('nooooooo')
    //       this.authService.getCookies()
    //        this.loggedIn=false
    //     }
    //   })
  }

  

   logOut()
  {
   console.log('logout')
  // Clear all items from local storage


    // this.cookiesService.deleteAll()
    this.router.navigate(['/login']);
    // this.router.navigate(['/login']);
   this.authService.logOut()
    // console.log(this.authService.user.value, 'loogoutedddddddd')

    // this.loggedIn=false

 

  }


}
