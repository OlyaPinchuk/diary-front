import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotesComponent} from "./components/notes/notes.component";
import {NoteComponent} from "./components/note/note.component";
import {ChosenNoteComponent} from "./components/chosen-note/chosen-note.component";
import {EditNoteComponent} from "./components/edit-note/edit-note.component";
import {AuthGuard} from "../../guards/auth.guard";

const routes: Routes = [
  {path: '', component: NotesComponent, canActivate: [AuthGuard]},
  {path: 'add', component: NoteComponent, canActivate: [AuthGuard]},
  {path: ':noteID', component: ChosenNoteComponent},
  {path: ':noteID/edit', component: EditNoteComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
