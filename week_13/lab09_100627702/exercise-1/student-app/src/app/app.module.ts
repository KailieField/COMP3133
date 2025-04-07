import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StudentsComponent } from './students.component';

@NgModule({
  declarations: [

    AppComponent,
    StudentsComponent //<---- removing i am using Angular 19 by default and Node 23.7.0 which is NOT COMPATIBLE with the lab instructions
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
