import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators as v} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {IFullUser} from "../../../interfaces";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // @ts-ignore
  form: FormGroup;
  // @ts-ignore
  urlId: integer;
  // @ts-ignore
  users: any[];
  // @ts-ignore
  someValue: number;


  constructor(private authService: AuthService, private router: Router, private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.someValue = this.authService.getCurrentState();
    this.form = new FormGroup({
      email: new FormControl('', [v.email, v.required]),
      password: new FormControl('', [v.required])
    });
  }

  login(form: FormGroup): void {
    this.authService.login(form.getRawValue()).subscribe(() => {
      // 1. get access token
      // 2. get user id from access token
      // 3. request http://localhost:8000/api/v1/users/<user_id_from_access_token>
      // this.httpClient.get<IFullUser[]>('http://localhost:8000/api/v1/users', {params: {email: 'some@mail.com'}}).subscribe(...)
      this.httpClient.get<IFullUser[]>('http://localhost:8000/api/v1/users')
        .subscribe(value => {
          this.users = value;
          for (let u = 0; u < this.users.length; u++)
            if (form.getRawValue().email == this.users[u].email) {
              this.urlId = `${this.users[u].id}`;

              this.router.navigate(['users', `${this.urlId}`]);
              // this.router.navigate(['users']);
            }
        });
    }, () => this.form.reset());

    this.authService.setNewState()
  }
}


      // console.log(form.getRawValue())

    // this.httpClient.get<IFullUser[]>('http://localhost:8000/api/v1/users')
    //   .subscribe(value => {
    //     this.users = value;
        // console.log(typeof this.users)
        // console.log(this.users);
        // console.log(this.users[0].email) // works
        // for (let u = 0; u < this.users.length; u++)
        //   if (form.getRawValue().email == this.users[u].email)
        //     console.log(`found: ${this.users[u].email}`)
          // console.log(this.users[u].email)

      // })

    // console.log(this.users)

