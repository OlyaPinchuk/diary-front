import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  userId: any
  userLists: any
  // @ts-ignore
  search: string
  // @ts-ignore
  listsFound:boolean
  foundLists: any
  pageSize: number = 5
  length: number = 0
  // @ts-ignore
  pageEvent: PageEvent
    // @ts-ignore
  page: number
  // @ts-ignore
  response: any
  searchLength: number = 100
  // @ts-ignore
  searchPage: number

  searchResponse: any
  foundListsNumber: number = 0


  constructor(private httpClient: HttpClient, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.pageEvent = new PageEvent
    this.pageEvent.pageIndex = 0
    this.page = this.pageEvent.pageIndex
    this.activatedRoute.params.subscribe(params => this.userId = params['id'])
    this.httpClient.get(`http://localhost:8000/api/v1/users/${this.userId}/lists`)
      .subscribe(value => {
        console.log(value)
        this.userLists = value
        // console.log(this.userLists)
      })
  }

  goToProfile(){
    this.router.navigate(['users', this.userId])
  }

  createList() {
    this.router.navigate(['users', this.userId, 'lists', 'add'])
  }

  searchLog() {
    this.foundLists = []
    this.searchPage = 0
    this.httpClient.get(`http://localhost:8000/api/v1/lists/search`, {
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

      this.foundLists = this.searchResponse.lists
      console.log(this.foundLists)
      if (this.foundLists.length == 0) {
        this.listsFound = false
      } else {
        this.listsFound = true
      }
    })
    .catch(console.log);
  }

  changePage() {
    console.log('change')
  }

}
