import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-chosen-note',
  templateUrl: './chosen-note.component.html',
  styleUrls: ['./chosen-note.component.css']
})
export class ChosenNoteComponent implements OnInit {
  userId: any
  noteId: any
  chosenNote: any
  // @ts-ignore
  editForm: boolean = false
  // @ts-ignore
  form: FormGroup

  constructor(private httpClient: HttpClient, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(params => {
        this.userId = params['id']
        this.noteId = params['noteID']
      })
    this.httpClient.get(`http://localhost:8000/api/v1/users/${this.userId}/notes/${this.noteId}`)
      .subscribe(value => {
        this.chosenNote = value
        console.log(this.chosenNote)
      })
  }

  goToProfile(){
    this.router.navigate(['users', this.userId])
  }

  goToNotes(){
    this.router.navigate(['users', this.userId, 'notes'])
  }

  editNote() {
    this.router.navigate(['users', this.userId, 'notes', this.chosenNote.id, 'edit'])
  }

  saveEdits(form: FormGroup, noteId: any) {
    this.httpClient.put(`http://localhost:8000/api/v1/users/${this.userId}/notes/${noteId}/edit`, form.getRawValue())
      .subscribe(() => {
        this.router.navigate(['users', this.userId, 'notes'])
      })
  }

  deleteNote(noteId: any) {
    this.httpClient.delete(`http://localhost:8000/api/v1/users/${this.userId}/notes/${noteId}/delete`)
      .subscribe(() => {
        this.router.navigate(['users', this.userId, 'notes'])
        // this.ngOnInit()
      })
  }

}
