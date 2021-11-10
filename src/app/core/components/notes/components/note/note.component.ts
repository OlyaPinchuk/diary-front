import {Component, Input, OnInit, DoCheck} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {INote} from "../../../../interfaces";
import {NoteService} from "../../../../services/note.service";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit, DoCheck {

  @Input()
  note: INote
  form: FormGroup
  userId: number
  editForm: boolean = false
  viewOption: number = 0
  color: number


  constructor(private router: Router, private activatedRoute: ActivatedRoute, private httpClient: HttpClient, private noteService: NoteService) { }

  ngOnInit(): void {
    if (localStorage.hasOwnProperty('view')) {
      this.viewOption = parseInt(<string>localStorage.getItem('view'))
      console.log(this.viewOption)
    } else {
      this.viewOption = 0
    }
    if (localStorage.hasOwnProperty('color')) {
      this.color = parseInt(<string>localStorage.getItem('color'))
    }
    this.activatedRoute.params.subscribe(params => this.userId = params['id'])

    this.form = new FormGroup({
      title: new FormControl(''),
      content: new FormControl(''),
      user: new FormControl(`${this.userId}`)
      }
    )
  }

  ngDoCheck() {
    if (localStorage.hasOwnProperty('view')) {
      this.viewOption = parseInt(<string>localStorage.getItem('view'))
      console.log(this.viewOption)
    } else if (!localStorage.hasOwnProperty('view')) {
      this.viewOption = 0
    }
  }


  getNote(noteId: any){
    this.router.navigate(['users', this.userId, 'notes', noteId])
  }

  editNote(noteId: any){
    this.router.navigate(['users', this.userId, 'notes', noteId, 'edit'])
  }

  saveNewNote(form: FormGroup){
    this.noteService.createNote(form).subscribe(() => {
        this.router.navigate(['users', this.userId, 'notes'])
      })
  }

  deleteNote(noteId: any) {
    let currentUrl = this.router.url
    console.log(currentUrl)
    this.noteService.deleteNote(this.userId, noteId).subscribe(() => {
      this.router.navigate([currentUrl])
    })
  }
}
