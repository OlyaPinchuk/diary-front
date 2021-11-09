import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";
import {IList} from "../../../../interfaces";
import {ListService} from "../../../../services/list.service";

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  userId: number
  userLists: IList[]
  search: string
  found: boolean
  foundLists: any
  pageSize: number = 5
  length: number = 0
  pageEvent: PageEvent
  page: number
  response: any
  searchLength: number = 0
  searchPage: number
  searchResponse: any
  sortOption: number
  sortedLists: IList[]
  searchSortOption: number


  constructor(private httpClient: HttpClient, private activatedRoute: ActivatedRoute, private router: Router, private listService: ListService) { }

  ngOnInit(): void {
    this.pageEvent = new PageEvent
    this.pageEvent.pageIndex = 0
    this.page = this.pageEvent.pageIndex
    this.activatedRoute.params.subscribe(params => this.userId = params['id'])
    this.listService.getLists(this.userId, this.page)
      .toPromise()
      .then(response => {
        this.response = response.body
        this.userLists = this.response.lists
        this.length = this.response.number
      })
  }

  goToProfile(){
    this.router.navigate(['users', this.userId])
  }

  createList() {
    this.router.navigate(['users', this.userId, 'lists', 'add'])
  }

  searchInput() {
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
        this.searchLength = this.searchResponse.number
        this.foundLists = this.searchResponse.lists
        console.log(this.foundLists)
        if (this.foundLists.length == 0) {
          this.found = false
        } else {
          this.found = true
        }
      })
      .catch(console.log);
  }

  changeSearchPage() {
    this.searchPage = this.pageEvent.pageIndex
    if (this.searchSortOption == 0 || this.searchSortOption == 1){
      this.httpClient.get(`http://localhost:8000/api/v1/lists/search`, {
      params: {
        userId: this.userId,
        searchText: this.search,
        pageIndex: this.searchPage,
        sortOption: this.searchSortOption
      },
      observe: 'response'
      })
        .toPromise()
        .then(response => {
          this.searchResponse = response.body
          this.foundLists = this.searchResponse.lists
          if (this.foundLists.length == 0) {
            this.found = false
          } else {
            this.found = true
          }
        })
        .catch(console.log);
    }
    else {
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
          if (this.foundLists.length == 0) {
            this.found = false
          } else {
            this.found = true
          }
        })
        .catch(console.log);
    }
  }

  changePage() {
    this.page = this.pageEvent.pageIndex
    this.httpClient.get(`http://localhost:8000/api/v1/users/${this.userId}/lists`, {
      params: {
        pageIndex: this.page
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.response = response.body
        this.userLists = this.response.lists
      })
      .catch(console.log);
  }

  sort(option: number){
    this.page = 0
    this.sortOption = option
    if (this.found) {
      this.searchSortOption = option
      this.httpClient.get(`http://localhost:8000/api/v1/lists/search`, {
      params: {
        userId: this.userId,
        searchText: this.search,
        pageIndex: this.searchPage,
        sortOption: this.sortOption
      },
      observe: 'response'
      })
        .toPromise()
        .then(response => {
          this.searchResponse = response.body
          this.searchLength = this.searchResponse.number
          this.foundLists = this.searchResponse.lists
          if (this.foundLists.length == 0) {
            this.found = false
          } else {
            this.found = true
          }
        })
        .catch(console.log);
    }
    else if (!this.found) {
      this.httpClient.get(`http://localhost:8000/api/v1/lists/sort`, {
      params: {
        userId: this.userId,
        sortOption: this.sortOption,
        pageIndex: this.page
      },
      observe: 'response'
      })
        .toPromise()
        .then(response => {
          this.response = response.body
          this.sortedLists = this.response
        })
        .catch(console.log);
    }
  }

  changeSortedPage() {
    this.page = this.pageEvent.pageIndex
    this.httpClient.get(`http://localhost:8000/api/v1/lists/sort`, {
      params: {
        userId: this.userId,
        sortOption: this.sortOption,
        pageIndex: this.page
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.response = response.body
        this.sortedLists = this.response
      })
      .catch(console.log);
  }

  goToNotes(){
    this.router.navigate(['users', this.userId, 'notes'])
  }

  goToLists(){
    this.router.navigate(['users', this.userId, 'lists'])
  }

  backToLists() {
    this.ngOnInit()
    this.found = true
    this.search = ''
    this.foundLists = null
  }

}
