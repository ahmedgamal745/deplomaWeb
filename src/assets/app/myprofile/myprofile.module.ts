import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { SharedModule } from "../shared.module";
import { myprofileRoutingModule } from "./myprofile-routing";
import { MyprofileComponent } from "./myprofile.component";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";


@NgModule({
    declarations:[
        MyprofileComponent,
    ],
    imports:[
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        myprofileRoutingModule,
        FormsModule,
        HttpClientModule,
        RouterModule

    ]
})
export class myprofileModule{}