import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators as v} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {IFullUser} from "../../../interfaces";
import {HttpClient} from "@angular/common/http";
import * as jwt from 'jsonwebtoken';
import JWTDecode from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  urlId: number;
  users: IFullUser[];
  token: any


  constructor(private authService: AuthService, private router: Router, private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [v.email, v.required]),
      password: new FormControl('', [v.required])
    });
    this.checkToken()
  }

  login(form: FormGroup): void {
    this.authService.login(form.getRawValue()).subscribe(() => {
      this.token = localStorage.getItem("access")
      let decoded:any = JWTDecode(this.token)
      console.log(decoded.user_id)
      this.urlId = decoded.user_id
      this.router.navigate(['users', this.urlId]);
    }, () => this.form.reset());
  }

  checkToken(): void {
      if(!!localStorage.getItem("access")){
        this.token = localStorage.getItem("access")
        let decoded:any = JWTDecode(this.token)
        console.log(decoded.user_id)
        this.urlId = decoded.user_id
        this.router.navigate(['users', `${this.urlId}`])
      }
  }

  loginAdmin(form: FormGroup) {
    this.authService.login(form.getRawValue()).subscribe((v) => {
      console.log(v)
      this.token = localStorage.getItem("access")
      let decoded:any = JWTDecode(this.token)
      console.log(decoded.user_id)
      this.urlId = decoded.user_id
      this.router.navigate(['admin']);
    }, () => this.form.reset());
  }

}
