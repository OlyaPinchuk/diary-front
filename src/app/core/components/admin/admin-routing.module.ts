import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersComponent} from "./users/users.component";
import {NotesComponent} from "./notes/notes.component";
import {ListsComponent} from "./lists/lists.component";
import {AdminGuard} from "../../guards/admin.guard";

const routes: Routes = [
  {path: '', component: UsersComponent, canActivate: [AdminGuard]},
  {path: 'notes', component: NotesComponent, canActivate: [AdminGuard]},
  {path: 'lists', component: ListsComponent, canActivate: [AdminGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
