import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { NotesComponent } from './notes/notes.component';
import {MatButtonModule} from "@angular/material/button";
import { UsersComponent } from './users/users.component';
import {MatTableModule} from "@angular/material/table";
import {MatDividerModule} from "@angular/material/divider";


@NgModule({
  declarations: [
    NotesComponent,
    UsersComponent
  ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        MatButtonModule,
        MatTableModule,
        MatDividerModule
    ]
})
export class AdminModule { }
