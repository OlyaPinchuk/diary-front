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

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private httpClient: HttpClient, private noteService: NoteService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.userId = params['id']
      this.noteId = params['noteID']
    })

    this.noteService.getChosenNote(this.userId, this.noteId).subscribe(value => {
      this.note = value
        this.form = new FormGroup({
          title: new FormControl(this.note.title),
          content: new FormControl(this.note.content),
          user: new FormControl(`${this.userId}`)
          }
        )
    })

    // this.httpClient.get<INote>(`http://localhost:8000/api/v1/users/${this.userId}/notes/${this.noteId}`)
    //   .subscribe(value => {
    //     this.note = value
    //     this.form = new FormGroup({
    //       title: new FormControl(this.note.title),
    //       content: new FormControl(this.note.content),
    //       user: new FormControl(`${this.userId}`)
    //       }
    //     )
    //   })
  }

  goToProfile(){
    this.router.navigate(['users', this.userId])
  }

  goToNotes(){
    this.router.navigate(['users', this.userId, 'notes'])
  }

  saveEdits(form: FormGroup, noteId: any){
    this.noteService.saveEdits(this.userId, noteId, form).subscribe(() => {
      this.router.navigate(['users', this.userId, 'notes'])
    })
    // this.httpClient.put<INote>(`http://localhost:8000/api/v1/users/${this.userId}/notes/${noteId}/edit`, form.getRawValue())
    //   .subscribe(() => {
    //     this.router.navigate(['users', this.userId, 'notes'])
    //   })
  }

  deleteNote(noteId: any) {
    this.noteService.deleteNote(this.userId, noteId).subscribe(() => {
      this.router.navigate(['users', this.userId, 'notes'])
    })

    // this.httpClient.delete<INote>(`http://localhost:8000/api/v1/users/${this.userId}/notes/${noteId}/delete`)
    //   .subscribe(() => {
    //     this.router.navigate(['users', this.userId, 'notes'])
    //     // this.ngOnInit()
    //   })
  }

}
