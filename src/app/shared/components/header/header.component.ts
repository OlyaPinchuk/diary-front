import {Component, Input, OnInit, ViewChild, OnChanges, SimpleChanges, AfterViewInit, DoCheck} from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "../../../core/services/auth.service";
import {LoginComponent} from "../../../core/components/auth/login/login.component";
import JWTDecode from "jwt-decode";
import {IToken} from "../../../core/interfaces";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {

  tokenPresent: boolean;
  token: any
  userId: number
  color: number

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

  }

  ngDoCheck() {
    this.checkToken()
    if (localStorage.hasOwnProperty('color')) {
      this.color = parseInt(<string>localStorage.getItem('color'))
    }
    else {
      this.color = 0
    }
  }

  goToProfile(){
    this.token = localStorage.getItem("access")
    let decoded:any = JWTDecode(this.token)
    this.userId = decoded.user_id
    // this.router.navigate(['users', `${this.userId}`])
    this.router.navigate(['auth', 'landing', this.userId])
  }


  checkToken(): void {
      if(!!localStorage.getItem("access")){
        this.tokenPresent = true
      }
      if(!localStorage.hasOwnProperty('access')){
        this.tokenPresent = false
      }

  }

  logOut(): void {
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
      this.checkToken()
  }


}
