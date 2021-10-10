import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListsComponent} from "./components/lists/lists.component";
import {ListComponent} from "./components/list/list.component";

const routes: Routes = [
  {path: '', component: ListsComponent},
  {path: 'add', component: ListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListsRoutingModule { }
