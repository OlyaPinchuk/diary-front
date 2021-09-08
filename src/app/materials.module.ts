import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';


const Materials = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Materials
  ],
  exports: [
    Materials
  ]
})
export class MaterialsModule { }
