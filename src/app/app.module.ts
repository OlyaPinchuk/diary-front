import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from "./app-routing.module";

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { MainComponent } from './shared/components/main/main.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatButtonModule} from "@angular/material/button";
import {MainInterceptor} from "./main.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatButtonModule,
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: MainInterceptor
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
