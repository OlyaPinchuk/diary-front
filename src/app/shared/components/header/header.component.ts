import {Component, Input, OnInit, ViewChild, OnChanges, SimpleChanges, AfterViewInit, DoCheck} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {AuthService} from "../../../core/services/auth.service";
import {LoginComponent} from "../../../core/components/auth/login/login.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit, DoCheck {
  // @ts-ignore
  tokenPresent: boolean;
  // @ts-ignore
  id: Observable<string>

  // @ts-ignore
  someValue: number;


  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    this.someValue = this.authService.getCurrentState();

    // this.logged = this.authService.loggedUser
    //
    // if (this.logged){
    //   console.log('user is logged')
    // } else if (!this.logged) {
    //   console.log('user is NOT logged')
    // }

    this.checkToken()

  }

  ngAfterViewInit() {
    this.someValue = this.authService.getCurrentState()
    console.log(this.someValue)
  }

  ngDoCheck() {
    this.someValue = this.authService.getCurrentState();
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
