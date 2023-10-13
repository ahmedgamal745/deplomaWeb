import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth.guard";
import { AdminEmployeeComponent } from "./admin-employee/admin-employee.component";
import { AdminHomeComponent } from "./admin-home/admin-home.component";
import { AdminProgramDetailsComponent } from "./admin-program-details/admin-program-details.component";
import { AdminProgramComponent } from "./admin-program/admin-program.component";
import { AdminComponent } from "./admin.component";

const routes:Routes = [

    {path:'', component:AdminComponent,canActivate: [AuthGuard],children:[
        {path:'' ,redirectTo:'home',pathMatch:'full'},
        {path:'home',component:AdminHomeComponent},
        {path:'programs',component:AdminProgramComponent},
        {path:'programs/:id',component:AdminProgramDetailsComponent},
        {path:'employee',component:AdminEmployeeComponent},
    
      ]},
]





@NgModule({

    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class AdminRoutingModule{}