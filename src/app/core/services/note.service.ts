import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {INote} from "../interfaces";
import {Form, FormGroup} from "@angular/forms";
import {environment} from "../../../environments/environment";

const API_HOST = environment.API_HOST

@Injectable({
  providedIn: 'root'
})
export class NoteService {


  constructor(private httpClient: HttpClient) { }

  getUserNotes(userId: number, page: number) {
    return this.httpClient.get<INote[]>(`${API_HOST}/api/v1/users/${userId}/notes`, {
      params: {
        pageIndex: page
      },
      observe: 'response'
    })
  }

  getChosenNote(userId: number, noteId: number) {
    return this.httpClient.get<INote>(`${API_HOST}/api/v1/users/${userId}/notes/${noteId}`)
  }

  createNote(form: FormGroup) {
    return this.httpClient.post<INote>(`${API_HOST}/api/v1/notes/add`, form.getRawValue())
  }

  deleteNote(userId: number, noteId: number) {
    return this.httpClient.delete(`${API_HOST}/api/v1/notes/${noteId}/delete`)
  }

  saveEdits(userId: number, noteId: number, form: FormGroup) {
    return this.httpClient.put<INote>(`${API_HOST}/api/v1/users/${userId}/notes/${noteId}/edit`, form.getRawValue())

  }

}
