import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {AppModule} from "../../../app.module";



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        // AppModule
    ]
})

// @ts-ignore
export class AuthModule { }
