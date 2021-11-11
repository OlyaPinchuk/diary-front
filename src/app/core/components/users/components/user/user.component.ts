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
  color: number
  admin: boolean = false

  constructor(private activatedRoute: ActivatedRoute, private httpClient: HttpClient, private router: Router, private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    if (localStorage.hasOwnProperty('color')) {
      this.color = parseInt(<string>localStorage.getItem('color'))
    }
    if (!this.user){
      this.activatedRoute.params.subscribe(params => {
        this.userId = params['id']
      })
      this.userService.getUser(this.userId).subscribe(value => {
        this.user = value
        if (this.user.is_staff) {
          this.admin = true
        }
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

  setBack(color: number) {
    localStorage.setItem('color', `${color}`)
    this.color = color
  }

  setDefaultBack() {
    localStorage.removeItem('color')
    this.color = 0
  }

  goToAdminPage() {
    this.router.navigate(['admin'])
  }
}
