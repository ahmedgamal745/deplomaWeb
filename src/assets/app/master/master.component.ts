import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent {
  constructor(private authService:AuthService,private cookiesService:CookieService){}

  ngOnInit()
  {
    // this.authService.getCookies()
  }
}
