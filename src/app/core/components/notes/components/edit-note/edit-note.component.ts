import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {INote} from "../../../../interfaces";
import {NoteService} from "../../../../services/note.service";

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent implements OnInit {

  form: FormGroup
  userId: number
  noteId: number
  note: INote
  color: number

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private httpClient: HttpClient, private noteService: NoteService) { }

  ngOnInit(): void {
    if (localStorage.hasOwnProperty('color')) {
      this.color = parseInt(<string>localStorage.getItem('color'))
    }
    this.activatedRoute.params.subscribe(params => {
      this.userId = params['id']
      this.noteId = params['noteID']
    })

    this.noteService.getChosenNote(this.userId, this.noteId).subscribe(value => {
      this.note = value
      if (this.note.user != this.userId) {
          this.router.navigate(['users', this.userId, 'notes'])
      }
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

  gotToLists() {
    this.router.navigate(['users', this.userId, 'lists'])
  }

  saveEdits(form: FormGroup, noteId: any){
    this.noteService.saveEdits(this.userId, noteId, form).subscribe(() => {
      this.router.navigate(['users', this.userId, 'notes'])
    })
  }

  deleteNote(noteId: any) {
    this.noteService.deleteNote(noteId).subscribe(() => {
      this.router.navigate(['users', this.userId, 'notes'])
    })
  }

}
