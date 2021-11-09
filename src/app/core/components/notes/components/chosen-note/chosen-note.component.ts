import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {INote} from "../../../../interfaces";
import {NoteService} from "../../../../services/note.service";

@Component({
  selector: 'app-chosen-note',
  templateUrl: './chosen-note.component.html',
  styleUrls: ['./chosen-note.component.css']
})
export class ChosenNoteComponent implements OnInit {

  userId: number
  noteId: number
  chosenNote: INote
  editForm: boolean = false
  form: FormGroup

  constructor(private httpClient: HttpClient, private activatedRoute: ActivatedRoute, private router: Router, private noteService: NoteService) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(params => {
        this.userId = params['id']
        this.noteId = params['noteID']
      })
      this.noteService.getChosenNote(this.userId, this.noteId).subscribe(value => {
        this.chosenNote = value
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

  editNote() {
    this.router.navigate(['users', this.userId, 'notes', this.chosenNote.id, 'edit'])
  }

  deleteNote(noteId: any) {
    this.noteService.deleteNote(this.userId, noteId).subscribe(() => {
      this.router.navigate(['users', this.userId, 'notes'])
    })
  }

}
