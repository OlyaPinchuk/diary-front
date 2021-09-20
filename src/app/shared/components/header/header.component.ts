import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // @ts-ignore
  tokenPresent: boolean;
  // @ts-ignore
  id: Observable<string>


  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.checkToken()

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
