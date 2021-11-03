import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {INote} from "../interfaces";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class NotesService {


  constructor(private httpClient: HttpClient) { }

  getUserNotes(userId: number, page: number) {
    return this.httpClient.get<INote[]>(`http://localhost:8000/api/v1/users/${userId}/notes`, {
      params: {
        pageIndex: page
      },
      observe: 'response'
    })
  }

  getChosenNote(userId: number, noteId: number) {
    return this.httpClient.get<INote>(`http://localhost:8000/api/v1/users/${userId}/notes/${noteId}`)
  }

  createNote(form: FormGroup) {
    return this.httpClient.post<INote>(`http://localhost:8000/api/v1/notes/add`, form.getRawValue())
  }

  deleteNote(userId: number, noteId: number) {
    return this.httpClient.delete(`http://localhost:8000/api/v1/users/${userId}/notes/${noteId}/delete`)

  }

}
