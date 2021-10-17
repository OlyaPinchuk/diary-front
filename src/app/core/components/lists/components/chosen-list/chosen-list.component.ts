import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-chosen-list',
  templateUrl: './chosen-list.component.html',
  styleUrls: ['./chosen-list.component.css']
})
export class ChosenListComponent implements OnInit {

  userId: any
  listId: any
  chosenList: any

  constructor(private httpClient: HttpClient, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      this.userId = params['id']
      this.listId = params['listId']

    })
    this.httpClient.get(`http://localhost:8000/api/v1/users/${this.userId}/lists/${this.listId}`)
      .subscribe(value => {
        this.chosenList = value
      })
  }

}
