import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login.component";
import { AuthGuard } from "../auth.guard";

@NgModule({
   imports:[RouterModule.forChild( [{path:'',component:LoginComponent,canActivate: [AuthGuard],}])],
   exports:[RouterModule]
})
export class LoginRoutingModule{}