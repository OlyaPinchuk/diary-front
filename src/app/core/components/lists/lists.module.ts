import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListsRoutingModule } from './lists-routing.module';
import { ListsComponent } from './components/lists/lists.component';
import { ListComponent } from './components/list/list.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    ListsComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    ListsRoutingModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class ListsModule { }
