import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {IFullUser} from "../../../../interfaces";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userId: any
  // @ts-ignore
  user: any

  constructor(private route: ActivatedRoute, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // console.log(params)
      // console.log(params['id'])
      this.userId = params['id']
    })
    this.httpClient.get(`http://localhost:8000/api/v1/users/${this.userId}`)
      .subscribe((value) => {
        this.user = value
        console.log(this.user)

      })
  }

}
