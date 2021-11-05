import { Component, OnInit } from '@angular/core';
import {IFullUser} from "../../../interfaces";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: IFullUser[];

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {

    this.httpClient.get<IFullUser[]>('http://localhost:8000/api/v1/users').subscribe(value => this.users = value)

  }

}
