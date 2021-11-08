import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {IToken} from "../../../interfaces";

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {

  params: any
  token: IToken

  constructor(private httpClient: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.params = this.activatedRoute.queryParams
    this.token = this.params.value.token

    this.httpClient.get(`http://localhost:8000/api/v1/auth_/activate?token=${this.token}`).subscribe(v => {
        console.log(v)
    })
  }

  toLogin() {
    this.router.navigate(['auth', 'login'])
  }

}
