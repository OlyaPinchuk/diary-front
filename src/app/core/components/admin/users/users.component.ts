import { Component, OnInit } from '@angular/core';
import {IFullUser} from "../../../interfaces";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";

const API_HOST = environment.API_HOST

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: IFullUser[];
  superUser: boolean

  constructor(private httpClient: HttpClient, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.superUser = JSON.parse(<string>localStorage.getItem('user')).is_superuser
    this.userService.getAllUsers().subscribe(value => {
      this.users = value
    })

  }

  upgradeToAdmin(id: any) {
    this.userService.upgradeToAdmin(id).subscribe(value => {
      this.ngOnInit()
    }, error => alert(`You do not have permission to perform this action. \n ${error.message}`))
  }

}
