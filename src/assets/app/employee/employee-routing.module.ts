import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth.guard";
import { DeplomsComponent } from "./deploms/deploms.component";
import { EmployeeHomeComponent } from "./employee-home/employee-home.component";
import { EmployeeComponent } from "./employee.component";
import { ShowStudentsComponent } from "./show-students/show-students.component";
import { StudentReqDataComponent } from "./student-req-data/student-req-data.component";
const routes:Routes=[
    {path:'', component:EmployeeComponent,canActivate: [AuthGuard], children:[
        {path:'',redirectTo:'empHome',pathMatch:'full'},
        {path:'empHome', component:EmployeeHomeComponent},
        {path:'empHome/:id', component:DeplomsComponent},
        {path:'empHome/:id/showStudents', component:ShowStudentsComponent},
        {path:'empHome/:id/showStudents/:studentId', component:StudentReqDataComponent}
    
      ]},
]
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class EmployeeRoutingModule{}