import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersComponent} from "./users/users.component";
import {NotesComponent} from "./notes/notes.component";
import {ListsComponent} from "./lists/lists.component";

const routes: Routes = [
  {path: '', component: UsersComponent},
  {path: 'notes', component: NotesComponent},
  {path: 'lists', component: ListsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
