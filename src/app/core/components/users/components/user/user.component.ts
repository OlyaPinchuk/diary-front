import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {IFullUser} from "../../../../interfaces";
import {AuthService} from "../../../../services/auth.service";
import {UserService} from "../../../../services/user.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userId: number
  user: IFullUser

  constructor(private activatedRoute: ActivatedRoute, private httpClient: HttpClient, private router: Router, private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    if (!this.user){
      this.activatedRoute.params.subscribe(params => {
        this.userId = params['id']
      })
      this.userService.getUser(this.userId).subscribe(value => {
        this.user = value
      })
    }
  }

  goToProfile(){
    this.router.navigate(['users', this.userId])
  }

  getUserNotes(){
    this.router.navigate(['users', this.userId, 'notes'])
  }

  getUserLists(){
    this.router.navigate(['users', this.userId, 'lists'])
  }

  editProfile(){
    this.router.navigate(['users', this.userId, 'profile'])
  }
}
