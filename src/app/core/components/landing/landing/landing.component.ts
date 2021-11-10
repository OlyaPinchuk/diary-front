import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {IFullUser} from "../../../interfaces";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  userId: number
  user: IFullUser
  color: number

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    if (localStorage.hasOwnProperty('color')) {
      this.color = parseInt(<string>localStorage.getItem('color'))
    }
    this.activatedRoute.params.subscribe(params => {
      this.userId = params['id']
    })
    this.userService.getUser(this.userId).subscribe(value => {
      this.user = value
    })
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

}
