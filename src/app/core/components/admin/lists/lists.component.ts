import { Component, OnInit } from '@angular/core';
import {IList, INote} from "../../../interfaces";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  lists: IList[]

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
        this.httpClient.get<IList[]>('http://localhost:8000/api/v1/lists').subscribe(value => this.lists = value)
    console.log(this.lists)
  }

}
