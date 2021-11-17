import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {INote} from "../../../interfaces";
import {environment} from "../../../../../environments/environment";
import {NoteService} from "../../../services/note.service";

const API_HOST = environment.API_HOST

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  notes: INote[]

  constructor(private httpClient: HttpClient, private noteService: NoteService) { }

  ngOnInit(): void {
    this.noteService.getAllNotes().subscribe(value => this.notes = value)
  }

}
