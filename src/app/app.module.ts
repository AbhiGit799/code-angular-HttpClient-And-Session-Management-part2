import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import { HttpClientModule } from '@angular/common/http';
import { Testdata } from './testdata';
import { Comp1Component } from './comp1/comp1.component';
import { Comp2Component } from './comp2/comp2.component';
import { CookieService } from 'ngx-cookie-service';



@NgModule({
  declarations: [AppComponent, Comp1Component, Comp2Component],
  imports: [
    BrowserModule, 
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    HttpClientInMemoryWebApiModule.forRoot(Testdata),

  ],
  providers:[CookieService], //example for showing nesting service example.
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    
  }
}
