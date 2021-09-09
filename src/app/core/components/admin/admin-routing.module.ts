import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserComponent} from "./user/user.component";
import {NotesComponent} from "./notes/notes.component";

const routes: Routes = [
  {path: '', component: UserComponent},
  {path: 'notes', component: NotesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
