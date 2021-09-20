import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  @Input()
  note: any

  userId: any

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  getNote(noteId: any){
    this.activatedRoute.params.subscribe(params => this.userId = params['id'])
    // this.router.navigate(['users', this.userId, 'notes', noteId])
    console.log('get note')
  }

}
