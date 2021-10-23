import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent implements OnInit {

  // @ts-ignore
  form: FormGroup

  userId: any
  noteId: any
  note: any

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.userId = params['id']
      this.noteId = params['noteID']
    })

    this.httpClient.get(`http://localhost:8000/api/v1/users/${this.userId}/notes/${this.noteId}`)
      .subscribe(value => {
        this.note = value
        this.form = new FormGroup({
          title: new FormControl(this.note.title),
          content: new FormControl(this.note.content),
          user: new FormControl(`${this.userId}`)
          }
        )
      })
  }

  goToProfile(){
    this.router.navigate(['users', this.userId])
  }

  goToNotes(){
    this.router.navigate(['users', this.userId, 'notes'])
  }

  saveEdits(form: FormGroup, noteId: any){
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
