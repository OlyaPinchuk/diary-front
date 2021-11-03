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

  constructor(private httpClient: HttpClient, private activatedRoute: ActivatedRoute, private router: Router, private userService: UserService) { }

  ngOnInit(): void {

    if (!this.user){
      this.activatedRoute.params.subscribe(params => {
        this.userId = params['id']
      })
      this.userService.getUser(this.userId).subscribe(value => {
        this.user = value
        this.form = new FormGroup({
            name: new FormControl(this.user.profile.name),
            surname: new FormControl(this.user.profile.surname),
            age: new FormControl(this.user.profile.age)
          })
      })

      // this.httpClient.get(`http://localhost:8000/api/v1/users/${this.userId}`)
      //   .subscribe(value => {
      //     this.user = value
      //     this.form = new FormGroup({
      //       name: new FormControl(this.user.profile.name),
      //       surname: new FormControl(this.user.profile.surname),
      //       age: new FormControl(this.user.profile.age)
      //     })
      //   })
    }

  }

  saveEdits(form: FormGroup) {
    this.userService.saveEdits(this.userId, form).subscribe(() => {
      this.router.navigate(['users', this.userId])
    })
    // this.httpClient.put(`http://localhost:8000/api/v1/users/${this.userId}/profile`, form.getRawValue())
    //   .subscribe(() => {
    //     this.router.navigate(['users', this.userId])
    //   })
  }

  goToProfile(){
    this.router.navigate(['users', this.userId])
  }
}
