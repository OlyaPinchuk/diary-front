import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {IList} from "../../../../interfaces";

@Component({
  selector: 'app-chosen-list',
  templateUrl: './chosen-list.component.html',
  styleUrls: ['./chosen-list.component.css']
})
export class ChosenListComponent implements OnInit {

  userId: number
  listId: number
  chosenList: IList

  constructor(private httpClient: HttpClient, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      this.userId = params['id']
      this.listId = params['listId']

    })
    this.httpClient.get<IList>(`http://localhost:8000/api/v1/users/${this.userId}/lists/${this.listId}`)
      .subscribe(value => {
        this.chosenList = value
      })
  }

  goToProfile(){
    this.router.navigate(['users', this.userId])
  }

  goToLists(){
    this.router.navigate(['users', this.userId, 'lists'])
  }

  editList(listId: any){
     this.router.navigate(['users', this.userId, 'lists', listId, 'edit'])
  }

  deleteList(listId: any) {
    this.httpClient.delete(`http://localhost:8000/api/v1/lists/${listId}/delete`)
      .subscribe(() => {
        this.router.navigate(['users', this.userId, 'lists'])
      })
  }

  changeItemStatus(itemId: any, itemContent: any, status: boolean){
    let fullItem = {
      id: itemId,
      content: itemContent,
      status: !status
    }
    this.httpClient.put(`http://localhost:8000/api/v1/lists/items/${itemId}`, fullItem)
      .subscribe(() => {
      })
  }
}
