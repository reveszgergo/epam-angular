import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CarComponent } from './car.component';
import { CarService } from './car.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    CarComponent
  ],
  providers: [
    CarService
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }
