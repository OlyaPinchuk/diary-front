import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";
import {INote} from "../../../../interfaces";
import {NoteService} from "../../../../services/note.service";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  userId: number
  userNotes: INote[]
  search: string
  notesFound: boolean
  foundNotes: any
  pageSize: number = 5
  length: number = 0
  // pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent
  page: number
  response: any
  searchLength: number = 0
  searchPage: number
  searchResponse: any
  foundNotesNumber: number = 0


  constructor(private httpClient: HttpClient, private activatedRoute: ActivatedRoute, private router: Router, private noteService: NoteService) { }

  ngOnInit(): void {
    this.pageEvent = new PageEvent
    this.pageEvent.pageIndex = 0
    this.page = this.pageEvent.pageIndex
    this.activatedRoute.params.subscribe(params => this.userId = params['id'])

    this.noteService.getUserNotes(this.userId, this.page).toPromise().then(response => {
      this.response = response.body
      this.userNotes = this.response.notes
      this.length = this.response.number
    })

    // this.httpClient.get<INote[]>(`http://localhost:8000/api/v1/users/${this.userId}/notes`, {
    //   params: {
    //     pageIndex: this.page
    //   },
    //   observe: 'response'
    // })
    // .toPromise()
    // .then(response => {
    //   this.response = response.body
    //   this.userNotes = this.response.notes
    //   this.length = this.response.number
    // })
    // .catch(console.log);

  }

  goToProfile(){
    this.router.navigate(['users', this.userId])
  }

  createNote() {
    this.router.navigate(['users', this.userId, 'notes', 'add'])
  }

  gotToLists() {
    this.router.navigate(['users', this.userId, 'lists'])

  }

  searchInput() {
    this.foundNotes = []
    this.searchPage = 0
    this.httpClient.get<INote[]>(`http://localhost:8000/api/v1/notes/search`, {
      params: {
        userId: this.userId,
        searchText: this.search,
        pageIndex: this.searchPage
      },
      observe: 'response'
    })
    .toPromise()
    .then(response => {
      this.searchResponse = response.body
      this.foundNotes = this.searchResponse.notes
      this.searchLength = this.searchResponse.number
      if (this.foundNotes.length == 0) {
        this.notesFound = false
      } else {
        this.notesFound = true
      }
    })
    .catch(console.log);

  }

  changeSearchPage(){
    this.searchPage = this.pageEvent.pageIndex
    console.log(this.searchPage)
    this.httpClient.get<INote[]>(`http://localhost:8000/api/v1/notes/search`, {
      params: {
        userId: this.userId,
        searchText: this.search,
        pageIndex: this.searchPage
      },
      observe: 'response'
    })
    .toPromise()
    .then(response => {
      this.searchResponse = response.body
      this.foundNotes = this.searchResponse.notes
      if (this.foundNotes.length == 0) {
        this.notesFound = false
      } else {
        this.notesFound = true
      }
    })
    .catch(console.log);
  }

  backToNotes() {
    this.ngOnInit()
    this.notesFound = true
    this.search = ''
    this.foundNotes = null
  }

  changePage() {
    this.page = this.pageEvent.pageIndex
    this.noteService.getUserNotes(this.userId, this.page).toPromise().then(response => {
      this.response = response.body
      this.userNotes = this.response.notes
    })

    // this.httpClient.get<INote[]>(`http://localhost:8000/api/v1/users/${this.userId}/notes`, {
    //   params: {
    //     pageIndex: this.page
    //   },
    //   observe: 'response'
    // })
    // .toPromise()
    // .then(response => {
    //   this.response = response.body
    //   this.userNotes = this.response.notes
    //
    // })
    // .catch(console.log);
  }
}
