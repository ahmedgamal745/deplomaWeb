import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared.module";
import { HomeRoutingModule } from "./home-routing.module";
import { HomePageComponent } from "./home-page.component";



@NgModule({
    declarations:[
        HomePageComponent,
    ],
    imports:[
        CommonModule,
        SharedModule,
        HomeRoutingModule,

    ]
})
export class HomeModule{}