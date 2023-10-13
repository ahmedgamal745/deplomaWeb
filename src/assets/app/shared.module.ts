import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { DateFormatPipe } from "./date-format.pipe";
import { StatusTextPipe } from "./status-text.pipe";

@NgModule({
    declarations :[  LoadingSpinnerComponent, DateFormatPipe, StatusTextPipe],
    imports:[CommonModule,],
    exports:[
        LoadingSpinnerComponent,
        CommonModule,
        DateFormatPipe,
        StatusTextPipe
    ]
})
export class SharedModule{}



