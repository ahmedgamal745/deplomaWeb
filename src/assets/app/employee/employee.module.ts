import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared.module";
import { DeplomsComponent } from "./deploms/deploms.component";
import { EmployeeHomeComponent } from "./employee-home/employee-home.component";
import { ShowStudentsComponent } from "./show-students/show-students.component";
import { StudentReqDataComponent } from "./student-req-data/student-req-data.component";
import { EmployeeRoutingModule } from "./employee-routing.module";
import { EmployeeComponent } from "./employee.component";
import { HttpClientModule } from "@angular/common/http";


@NgModule({
    declarations:[
       
        EmployeeHomeComponent,
        DeplomsComponent,
        ShowStudentsComponent,
        EmployeeComponent,
        StudentReqDataComponent,
   
        
    ],
    imports:[
        RouterModule,
        CommonModule,
        ReactiveFormsModule,
        EmployeeRoutingModule,
        SharedModule,
        FormsModule,
        HttpClientModule,
   
    ]
})
export class EmployeeModule{}