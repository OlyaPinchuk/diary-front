import {Component, Input, OnInit, ViewChild, OnChanges, SimpleChanges, AfterViewInit, DoCheck} from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {map} from "rxjs/operators";
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

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

  }

  ngDoCheck() {
    this.checkToken()

  }

  goToProfile(){
    this.token = localStorage.getItem("access")
    let decoded:any = JWTDecode(this.token)
    this.userId = decoded.user_id
    this.router.navigate(['users', `${this.userId}`])
  }


  checkToken(): void {
      if(!!localStorage.getItem("access")){
        this.tokenPresent = true
        // console.log('check true')
      }
      if(!localStorage.hasOwnProperty('access')){
        this.tokenPresent = false
        // console.log(('check false'))
      }

  }

  logOut(): void {
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
      this.checkToken()
  }


}
