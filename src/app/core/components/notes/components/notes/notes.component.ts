import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  userId: any
  userNotes: any
    // @ts-ignore
  search: string
  // @ts-ignore
  notesFound: boolean
  foundNotes: any
  pageSize: number = 5
  length: number = 0
  // pageSizeOptions: number[] = [5, 10, 25, 100];
  // @ts-ignore
  pageEvent: PageEvent
  // @ts-ignore
  page: number
  // @ts-ignore
  response: any

  searchLength: number = 0
  // @ts-ignore
  searchPage: number

  searchResponse: any
  foundNotesNumber: number = 0


  constructor(private httpClient: HttpClient, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.pageEvent = new PageEvent
    this.pageEvent.pageIndex = 0
    this.page = this.pageEvent.pageIndex
    this.activatedRoute.params.subscribe(params => this.userId = params['id'])

    this.httpClient.get(`http://localhost:8000/api/v1/users/${this.userId}/notes`, {
      params: {
        pageIndex: this.page
      },
      observe: 'response'
    })
    .toPromise()
    .then(response => {
      this.response = response.body
      this.userNotes = this.response.notes
      this.length = this.response.number
    })
    .catch(console.log);

    // this.httpClient.get(`http://localhost:8000/api/v1/users/${this.userId}/notes`)
    //   .subscribe((value => {
    //     this.userNotes = value
    //   }))



  }

  goToProfile(){
    this.router.navigate(['users', this.userId])
  }

  createNote() {
    this.router.navigate(['users', this.userId, 'notes', 'add'])
  }

  searchLog() {
    this.foundNotes = []
    this.searchPage = 0
    this.httpClient.get(`http://localhost:8000/api/v1/notes/search`, {
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
    this.httpClient.get(`http://localhost:8000/api/v1/notes/search`, {
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

  // searchNotes(text: string) {
  //   console.log(text)
  //   this.httpClient.get(`http://localhost:8000/api/v1/notes/search`, {
  //     params: {
  //       userId: this.userId,
  //       searchText: 'ww'
  //     },
  //     observe: 'response'
  //   })
  //   .toPromise()
  //   .then(response => {
  //     console.log(response.body);
  //   })
  //   .catch(console.log);
  // }

  changePage() {
    this.page = this.pageEvent.pageIndex
    this.httpClient.get(`http://localhost:8000/api/v1/users/${this.userId}/notes`, {
      params: {
        pageIndex: this.page
      },
      observe: 'response'
    })
    .toPromise()
    .then(response => {
      this.response = response.body
      this.userNotes = this.response.notes

    })
    .catch(console.log);
  }
}
