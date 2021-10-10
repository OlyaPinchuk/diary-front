import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  userId: any
  userLists: any

  constructor(private httpClient: HttpClient, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => this.userId = params['id'])
    this.httpClient.get(`http://localhost:8000/api/v1/users/${this.userId}/lists`)
      .subscribe(value => {
        this.userLists = value
        console.log(this.userLists)
      })
  }

  goToProfile(){
    this.router.navigate(['users', this.userId])
  }

  createList() {
    this.router.navigate(['users', this.userId, 'lists', 'add'])
  }

}
