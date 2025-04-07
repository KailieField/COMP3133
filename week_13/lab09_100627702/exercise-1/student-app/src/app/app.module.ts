import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";


import { StudentComponent } from "./students.component";

@NgModule({
    declarations: [
        AppComponent,
        StudentComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule {}

