import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {IFullUser} from "../../../interfaces";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  form: FormGroup
  userId: number
  user: IFullUser
  color: number

  constructor(private httpClient: HttpClient, private activatedRoute: ActivatedRoute, private router: Router, private userService: UserService) { }

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
        this.form = new FormGroup({
            name: new FormControl(this.user.profile.name),
            surname: new FormControl(this.user.profile.surname),
            age: new FormControl(this.user.profile.age),
            // status: new FormControl(this.user.is_staff)
          })
      })
    }
  }

  saveEdits(form: FormGroup) {
    this.userService.saveEdits(this.userId, form).subscribe(() => {
      this.router.navigate(['users', this.userId])
    })
  }

  goToProfile(){
    this.router.navigate(['users', this.userId])
  }

  goToNotes(){
    this.router.navigate(['users', this.userId, 'notes'])
  }

  goToLists(){
    this.router.navigate(['users', this.userId, 'lists'])
  }
}
