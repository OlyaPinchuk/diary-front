import { Component, OnInit } from '@angular/core';
import {IFullUser} from "../../../interfaces";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";

const API_HOST = environment.API_HOST

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: IFullUser[];

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {

    this.httpClient.get<IFullUser[]>(`${API_HOST}/api/v1/users`).subscribe(value => this.users = value)

  }

}
