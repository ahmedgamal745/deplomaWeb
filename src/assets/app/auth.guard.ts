import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Replace with your authentication service

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
    // if (this.authService.user.value) {
    //   // If the user is authenticated, allow access to the route
    //   console.log('ssssss')
     
    // } else {
    //   // If the user is not authenticated, redirect to the login page
    //   this.router.navigate(['/login']);
    //   return false;
    // }
    return true;
  }

//   const userRole = this.authService.user.value.role; // Replace with your logic to get the user's role

//   // Check the user's role and allow or deny access accordingly
//   if (userRole === 'applicant') {
//     console.log(userRole)
//     // User is an applicant; allow access
//     return true;
//   } else {
//     // User has a different role; deny access and redirect to a denied page
//     return this.router.createUrlTree(['/denied']); // Redirect to the denied page or another appropriate page
//   }
// }
}
