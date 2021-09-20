import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  userId: any
  userNotes: any

  constructor(private httpClient: HttpClient, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => this.userId = params['id'])
    this.httpClient.get(`http://localhost:8000/api/v1/users/${this.userId}/notes`)
      .subscribe((value => {
        this.userNotes = value
        console.log(this.userNotes)
      }))
  }

  goToProfile(){
    this.router.navigate(['users', this.userId])
  }

}
