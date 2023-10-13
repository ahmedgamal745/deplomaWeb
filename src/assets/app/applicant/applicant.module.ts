import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ApplicantRoutingModule } from "./applicant-routing.module";
import { SharedModule } from "../shared.module";
import { AllApplicationsComponent } from "./all-applications/all-applications.component";
import { ApplicantComponent } from "./applicant.component";
import { ApplicationDetailsComponent } from "./application-details/application-details.component";
import { ProgramApplicationComponent } from "./program-application/program-application.component";
import { ProgramDetailsComponent } from "./program-details/program-details.component";
import { ProgramListComponent } from "./program-list/program-list.component";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    declarations:
    [
        AllApplicationsComponent,
        ApplicationDetailsComponent,
        ProgramListComponent,
        ProgramDetailsComponent,
        ProgramApplicationComponent,
        ApplicantComponent,
       
    ],
    imports:[
        RouterModule,
        CommonModule,
        ReactiveFormsModule,
        ApplicantRoutingModule,
        SharedModule,
        FormsModule,
        HttpClientModule,

    ]

})
export class ApplicantModule{}