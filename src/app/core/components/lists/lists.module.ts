import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListsRoutingModule } from './lists-routing.module';
import { ListsComponent } from './components/lists/lists.component';
import { ListComponent } from './components/list/list.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatListModule} from "@angular/material/list";
import { ChosenListComponent } from './components/chosen-list/chosen-list.component';
import { EditListComponent } from './components/edit-list/edit-list.component';


@NgModule({
  declarations: [
    ListsComponent,
    ListComponent,
    ChosenListComponent,
    EditListComponent
  ],
    imports: [
        CommonModule,
        ListsRoutingModule,
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatListModule
    ]
})
export class ListsModule { }
