import { NgModule } from "@angular/core";
import { NgModel } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth.guard";
import { AllApplicationsComponent } from "./all-applications/all-applications.component";
import { ApplicantComponent } from "./applicant.component";
import { ApplicationDetailsComponent } from "./application-details/application-details.component";
import { ProgramApplicationComponent } from "./program-application/program-application.component";
import { ProgramDetailsComponent } from "./program-details/program-details.component";
import { ProgramListComponent } from "./program-list/program-list.component";
const routes:Routes = [

    {path:'',component:ApplicantComponent,canActivate: [AuthGuard],children:[
        {path:'',redirectTo:'program-list', pathMatch:'full'},
        {path:'program-list',component:ProgramListComponent},
        {path:'program-list/:id',component:ProgramDetailsComponent},
        {path:'program-list/:id/program-application',component:ProgramApplicationComponent},
    
    
        {path:'MyApplications', component:AllApplicationsComponent},
        {path:'MyApplications/:id', component:ApplicationDetailsComponent}
      ]},
    
]
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class ApplicantRoutingModule{}