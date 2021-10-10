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

  editNote() {
    this.form = new FormGroup({
      id: new FormControl(this.chosenNote.id),
      title: new FormControl(this.chosenNote.title),
      content: new FormControl(this.chosenNote.content),
      user: new FormControl(this.chosenNote.user)
    })
    this.editForm = true
  }

  saveEdits() {
    console.log('save edited note')
  }

}
