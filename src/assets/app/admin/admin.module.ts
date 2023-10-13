import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared.module";
import { AdminEmployeeComponent } from "./admin-employee/admin-employee.component";
import { AdminHomeComponent } from "./admin-home/admin-home.component";
import { AdminProgramDetailsComponent } from "./admin-program-details/admin-program-details.component";
import { AdminProgramComponent } from "./admin-program/admin-program.component";
import { AdminComponent } from "./admin.component";
import { AdminRoutingModule } from "./admin-routing.module";

@NgModule({
    declarations:[
        AdminComponent,
        AdminHomeComponent,
        AdminProgramComponent,
        AdminEmployeeComponent,
     
        AdminProgramDetailsComponent,
    ],
    imports:[
        RouterModule,
        CommonModule,
        ReactiveFormsModule,
        AdminRoutingModule,
        HttpClientModule,
        FormsModule,
        SharedModule
    ]

})
export class AdminModule{}