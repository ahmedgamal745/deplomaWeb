import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { AuthGuard } from "../auth.guard";
import { MyprofileComponent } from "./myprofile.component";

@NgModule({
   imports:[RouterModule.forChild( [  {path:'',component:MyprofileComponent,canActivate: [AuthGuard],},
])],
   exports:[RouterModule]
})
export class myprofileRoutingModule{}