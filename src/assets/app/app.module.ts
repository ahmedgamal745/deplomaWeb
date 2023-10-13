import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';

import { LecturerComponent } from './lecturer/lecturer.component';

import {CookieService} from 'ngx-cookie-service';

import { SharedModule } from './shared.module';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { StatusTextPipe } from './status-text.pipe';








@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
  
  
  
  
  
    LecturerComponent,
  
  
  
   
       
       

        

        
     

   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
 
   
   

    HttpClientModule,
   
   
    SharedModule,

 
  ],
  providers: [AuthService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
