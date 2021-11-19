import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {IFullUser} from "../../../interfaces";
import {environment} from "../../../../../environments/environment";


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
  avatar: boolean
  file: any
  formData: any
  fileName: any
  API_HOST = environment.API_HOST



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
        // if (this.user.profile.avatar == 'images/avatar.jpg') {
        //   this.avatar = false
        // }
        this.form = new FormGroup({
            name: new FormControl(this.user.profile.name),
            surname: new FormControl(this.user.profile.surname),
            age: new FormControl(this.user.profile.age),
            avatar: new FormControl(this.user.profile.avatar)
          })
      })
    }
  }

  saveEdits(form: FormGroup) {
    this.formData = new FormData()
    if (this.file) {
      this.formData.append('avatar', this.file)
    }
    this.formData.append('name', form.getRawValue().name)
    this.formData.append('surname', form.getRawValue().surname)
    this.formData.append('age', form.getRawValue().age)
    this.userService.saveEdits(this.userId, this.formData).subscribe(() => {
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

  onFileChanged(event: any) {
    this.file = event.target.files[0]
  }

}
