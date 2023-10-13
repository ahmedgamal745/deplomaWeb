import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from "./login.component";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    declarations:[
        LoginComponent,
    ],
    imports:[
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        LoginRoutingModule,
        FormsModule,
        HttpClientModule,

    ]
})
export class LoginModule{}