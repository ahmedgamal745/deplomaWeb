import { NgModule } from "@angular/core";
import { CreateAdminsComponent } from "./master-admins/create-admins/create-admins.component";
import { MasterAdminsComponent } from "./master-admins/master-admins.component";
import { MasterCollegeComponent } from "./master-college/master-college.component";
import { MasterHomeComponent } from "./master-home/master-home.component";
import { MasterComponent } from "./master.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MasterRoutingModule } from "./master-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { SharedModule } from "../shared.module";

@NgModule({
    declarations:[

        MasterComponent,
        MasterHomeComponent,
        MasterAdminsComponent,
        MasterCollegeComponent,
        CreateAdminsComponent,
    ],
    imports:[
        RouterModule,
        CommonModule,
        ReactiveFormsModule,
        MasterRoutingModule,
      
        HttpClientModule,
        FormsModule,
        SharedModule
    ]
})
export class MasterModule{}