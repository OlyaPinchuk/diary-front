import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListsComponent} from "./components/lists/lists.component";
import {ListComponent} from "./components/list/list.component";
import {ChosenListComponent} from "./components/chosen-list/chosen-list.component";
import {EditListComponent} from "./components/edit-list/edit-list.component";

const routes: Routes = [
  {path: '', component: ListsComponent},
  {path: 'add', component: ListComponent},
  {path: ':listId', component: ChosenListComponent},
  {path: ':listId/edit', component: EditListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListsRoutingModule { }
