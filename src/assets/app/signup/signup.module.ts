import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SignupComponent } from "./signup.component";
import { signupRoutingModule } from "./signup-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";


@NgModule({
    declarations:[
        SignupComponent,
    ],
    imports:[
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        signupRoutingModule,
        FormsModule,
        HttpClientModule,
        RouterModule

    ]
})
export class signupModule{}