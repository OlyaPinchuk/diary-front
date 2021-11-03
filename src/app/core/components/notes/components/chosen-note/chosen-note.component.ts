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

      // this.httpClient.get<INote>(`http://localhost:8000/api/v1/users/${this.userId}/notes/${this.noteId}`)
      // .subscribe(value => {
      //   this.chosenNote = value
      //   console.log(this.chosenNote)
      // })
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

  // saveEdits(form: FormGroup, noteId: any) {
  //   this.httpClient.put<INote>(`http://localhost:8000/api/v1/users/${this.userId}/notes/${noteId}/edit`, form.getRawValue())
  //     .subscribe(() => {
  //       this.router.navigate(['users', this.userId, 'notes'])
  //     })
  // }

  deleteNote(noteId: any) {
    this.noteService.deleteNote(this.userId, noteId).subscribe(() => {
      this.router.navigate(['users', this.userId, 'notes'])
    })
    // this.httpClient.delete<INote>(`http://localhost:8000/api/v1/users/${this.userId}/notes/${noteId}/delete`)
    //   .subscribe(() => {
    //     this.router.navigate(['users', this.userId, 'notes'])
    //   })
  }

}
