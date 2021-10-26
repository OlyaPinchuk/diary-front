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
  pageSize = 5
  length = 100
  // pageSizeOptions: number[] = [5, 10, 25, 100];
  // @ts-ignore
  pageEvent: PageEvent

  // @ts-ignore
  page: number

  // @ts-ignore
  test: any


  constructor(private httpClient: HttpClient, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.page = 0
    this.activatedRoute.params.subscribe(params => this.userId = params['id'])

    this.httpClient.get(`http://localhost:8000/api/v1/users/${this.userId}/notes`, {
      params: {
        pageIndex: this.page
      },
      observe: 'response'
    })
    .toPromise()
    .then(response => {
      this.test = response.body
      this.userNotes = this.test.notes
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
    this.httpClient.get(`http://localhost:8000/api/v1/notes/search`, {
      params: {
        userId: this.userId,
        searchText: this.search
      },
      observe: 'response'
    })
    .toPromise()
    .then(response => {
      this.foundNotes = response.body
      if (this.foundNotes.length == 0) {
        this.notesFound = false
      } else {
        this.notesFound = true
      }
      console.log(response.body);
    })
    .catch(console.log);



    // this.foundNotes = []
    // for (let i = 0; i < this.userNotes.length; i++)  {
    //   if (this.userNotes[i].title.includes(this.search)) {
    //     this.foundNotes.push(this.userNotes[i])
    //   }
    // }
    // console.log(this.foundNotes)
    // if (this.foundNotes.length == 0) {
    //   this.notesFound = false
    //
    // } else {
    //   this.notesFound = true
    // }
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

  testPages() {

    console.log(this.pageEvent.pageIndex)
    this.page = this.pageEvent.pageIndex
    this.httpClient.get(`http://localhost:8000/api/v1/users/${this.userId}/notes`, {
      params: {
        pageIndex: this.page
      },
      observe: 'response'
    })
    .toPromise()
    .then(response => {
      this.test = response.body
      this.userNotes = this.test.notes
      // console.log(JSON.parse(JSON.stringify(response.body)).number)
      // this.userNotes = response.body
      // @ts-ignore

      // console.log(this.test.number)
      // console.log(this.userNotes[0])
    })
    .catch(console.log);
  }
}
