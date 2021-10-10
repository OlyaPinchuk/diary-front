import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  @Input()
  note: any

  // @ts-ignore
  form: FormGroup
  userId: any
  chosenNote: any
  // @ts-ignore
  editForm: boolean = false

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private httpClient: HttpClient) { }

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
    console.log(noteId)
  }

  editNote(noteId: any){
    this.httpClient.get(`http://localhost:8000/api/v1/users/${this.userId}/notes/${noteId}`)
      .subscribe(value => {
        this.chosenNote = value
        console.log(this.chosenNote)
        this.form = new FormGroup({
          id: new FormControl(this.chosenNote.id),
          title: new FormControl(this.chosenNote.title),
          content: new FormControl(this.chosenNote.content),
          user: new FormControl(this.chosenNote.user)
        })
        this.editForm = true
        console.log(this.editForm)
      })

  }

  saveNewNote(form: FormGroup){
    this.httpClient.post(`http://localhost:8000/api/v1/notes/add`, form.getRawValue())
      .subscribe(() => {
        this.router.navigate(['users', this.userId, 'notes'])
      })
  }

  saveEdits() {
    console.log('save edits')
  }

}
