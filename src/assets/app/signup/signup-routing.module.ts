import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { AuthGuard } from "../auth.guard";
import { SignupComponent } from "./signup.component";

@NgModule({
   imports:[RouterModule.forChild( [{path:'',component:SignupComponent,canActivate: [AuthGuard],}])],
   exports:[RouterModule]
})
export class signupRoutingModule{}