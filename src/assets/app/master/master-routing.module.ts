import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth.guard";
import { CreateAdminsComponent } from "./master-admins/create-admins/create-admins.component";
import { MasterAdminsComponent } from "./master-admins/master-admins.component";
import { MasterCollegeComponent } from "./master-college/master-college.component";
import { MasterHomeComponent } from "./master-home/master-home.component";
import { MasterComponent } from "./master.component";

const routes:Routes = [
    {path:'', component:MasterComponent,canActivate: [AuthGuard],children:[
        {path:'' ,redirectTo:'home',pathMatch:'full'},
        {path:'home',component:MasterHomeComponent},
        {path:'college',component:MasterCollegeComponent},
        {path:'admins',component:MasterAdminsComponent},
        {path:'admins/:id',component:CreateAdminsComponent}
    
        
    
      ]}
]
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class MasterRoutingModule{}