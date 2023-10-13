import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'commerce';
  constructor(private authService:AuthService,private cookiesService:CookieService,private router:Router){}
  ngOnInit()
  {

    this.authService.autoLogin()
  }
}
