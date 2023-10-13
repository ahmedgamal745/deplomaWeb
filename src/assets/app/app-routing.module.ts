import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ApplicantComponent } from './applicant/applicant.component';
import { ProgramListComponent } from './applicant/program-list/program-list.component';
import { ProgramDetailsComponent } from './applicant/program-details/program-details.component';
import { ProgramApplicationComponent } from './applicant/program-application/program-application.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { EmployeeComponent } from './employee/employee.component';
import { ShowStudentsComponent } from './employee/show-students/show-students.component';
import { StudentReqDataComponent } from './employee/student-req-data/student-req-data.component';
import { AdminComponent } from './admin/admin.component';
import { MasterComponent } from './master/master.component';
import { MasterHomeComponent } from './master/master-home/master-home.component';
import { MasterCollegeComponent } from './master/master-college/master-college.component';
import { MasterAdminsComponent } from './master/master-admins/master-admins.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminProgramComponent } from './admin/admin-program/admin-program.component';
import { AdminEmployeeComponent } from './admin/admin-employee/admin-employee.component';
import { CreateAdminsComponent } from './master/master-admins/create-admins/create-admins.component';
import { AdminProgramDetailsComponent } from './admin/admin-program-details/admin-program-details.component';
import { AuthGuard } from './auth.guard';
import { AllApplicationsComponent } from './applicant/all-applications/all-applications.component';
import { ApplicationDetailsComponent } from './applicant/application-details/application-details.component';
import { EmployeeHomeComponent } from './employee/employee-home/employee-home.component';
import { DeplomsComponent } from './employee/deploms/deploms.component';
import { MasterModule } from './master/master.module';





const routes: Routes = [
   {path:'',redirectTo:'/home', pathMatch:'full'},

  {path:'home',
  loadChildren: ()=> import('./home-page/home.module')
  .then(m=>m.HomeModule)
 },
 


  {path:'login',
  loadChildren: ()=> import('./login/login.module')
  .then(m=>m.LoginModule)
 },
 
 
 

  {path:'myprofile',
  loadChildren: ()=> import('./myprofile/myprofile.module')
  .then(m=>m.myprofileModule)
 },







  {path:'signup',
  loadChildren: ()=> import('./signup/signup.module')
  .then(m=>m.signupModule)
 },






  
  {path:'applicant',
  loadChildren: ()=> import('./applicant/applicant.module')
  .then(m=>m.ApplicantModule)
 },

 

  {path:'employee',
  loadChildren: ()=> import('./employee/employee.module')
  .then(m=>m.EmployeeModule)
 },
 

  {path:'admin',
  loadChildren: ()=> import('./admin/admin.module')
  .then(m=>m.AdminModule)
 },


  {path:'master',
   loadChildren: ()=> import('./master/master.module')
   .then(m=>m.MasterModule)
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
