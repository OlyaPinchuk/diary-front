import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UserComponent } from './user/user.component';
import { NotesComponent } from './notes/notes.component';
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    UserComponent,
    NotesComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatButtonModule
  ]
})
export class AdminModule { }
