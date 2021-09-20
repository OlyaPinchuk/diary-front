import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserComponent} from "./components/user/user.component";
import {UsersComponent} from "./components/users/users.component";

const routes: Routes = [
  {path: '', component: UsersComponent},
  {path: ':id', component: UserComponent},
  {path: ':id/notes', loadChildren: () => import('../notes/notes.module').then(m => m.NotesModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
