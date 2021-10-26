import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';
import { NotesComponent } from './components/notes/notes.component';
import { NoteComponent } from './components/note/note.component';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { ChosenNoteComponent } from './components/chosen-note/chosen-note.component';
import { EditNoteComponent } from './components/edit-note/edit-note.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatDividerModule} from "@angular/material/divider";
import {MatPaginatorModule} from "@angular/material/paginator";


@NgModule({
  declarations: [
    NotesComponent,
    NoteComponent,
    ChosenNoteComponent,
    EditNoteComponent
  ],
  imports: [
    CommonModule,
    NotesRoutingModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatDividerModule,
    FormsModule,
    MatPaginatorModule
  ]
})
export class NotesModule { }
