import { Component, OnInit } from '@angular/core';
import {IList, INote} from "../../../interfaces";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";

const API_HOST = environment.API_HOST

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  lists: IList[]

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
        this.httpClient.get<IList[]>(`${API_HOST}/api/v1/lists`).subscribe(value => this.lists = value)
  }

}
