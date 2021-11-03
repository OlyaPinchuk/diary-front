import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {INote} from "../../../../interfaces";
import {NotesService} from "../../../../services/notes.service";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  @Input()
  note: INote

  form: FormGroup
  userId: number
  chosenNote: INote
  editForm: boolean = false



  constructor(private router: Router, private activatedRoute: ActivatedRoute, private httpClient: HttpClient, private notesService: NotesService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => this.userId = params['id'])

    this.form = new FormGroup({
      title: new FormControl(''),
      content: new FormControl(''),
      user: new FormControl(`${this.userId}`)
      }
    )
  }

  getNote(noteId: any){
    this.router.navigate(['users', this.userId, 'notes', noteId])
  }

  editNote(noteId: any){
    this.router.navigate(['users', this.userId, 'notes', noteId, 'edit'])
  }

  saveNewNote(form: FormGroup){
    this.notesService.createNote(form).subscribe(() => {
        this.router.navigate(['users', this.userId, 'notes'])
      })

    // this.httpClient.post<INote>(`http://localhost:8000/api/v1/notes/add`, form.getRawValue())
    //   .subscribe(() => {
    //     this.router.navigate(['users', this.userId, 'notes'])
    //   })
  }

  deleteNote(noteId: any) {
    this.notesService.deleteNote(this.userId, noteId).subscribe(() => {
      this.router.navigate(['users', this.userId])
    })


    // this.httpClient.delete<INote>(`http://localhost:8000/api/v1/users/${this.userId}/notes/${noteId}/delete`)
    //   .subscribe(() => {
    //     this.router.navigate(['users', this.userId])
    //   })
  }


}
