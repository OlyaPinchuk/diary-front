import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {INote} from "../../../interfaces";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  notes: INote[]

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {

    this.httpClient.get<INote[]>('http://localhost:8000/api/v1/notes').subscribe(value => this.notes = value)
  }

}
