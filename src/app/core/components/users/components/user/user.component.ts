import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from "@angular/router";
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
  // @ts-ignore
  userNotes: any

  constructor(private activatedRoute: ActivatedRoute, private httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void {
    if (!this.user){
      this.activatedRoute.params.subscribe(params => {
        this.userId = params['id']
      })
      this.httpClient.get(`http://localhost:8000/api/v1/users/${this.userId}`)
        .subscribe((value) => {
          this.user = value
          console.log(this.user)
        })
    }
  }
  getUserNotes(){
    this.router.navigate(['users', this.userId, 'notes'])

  }
}
