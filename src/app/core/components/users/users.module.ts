import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './components/users/users.component';
import { UserComponent } from './components/user/user.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatDividerModule} from "@angular/material/divider";


@NgModule({
  declarations: [
    UsersComponent,
    UserComponent
  ],
    imports: [
        CommonModule,
        UsersRoutingModule,
        MatCardModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatDividerModule
    ]
})
export class UsersModule { }
