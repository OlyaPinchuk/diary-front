import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  // @ts-ignore
  notes: any[]

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get<any[]>('http://localhost:8000/api/v1/notes').subscribe(value => this.notes = value)
  }

}
