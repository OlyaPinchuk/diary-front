import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {FormArray, FormControl, FormGroup, FormBuilder} from "@angular/forms";
import {getSortHeaderNotContainedWithinSortError} from "@angular/material/sort/sort-errors";
import {IList} from "../../../../interfaces";
import {ListService} from "../../../../services/list.service";

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.css']
})
export class EditListComponent implements OnInit {

  userId: number
  listId: number
  chosenList: IList
  itemsArray: FormArray
  itemObject: FormGroup
  listForm: FormGroup
  color: number

  get items(){
    return this.listForm.get('items') as FormArray
  }

  addItem() {
    this.itemObject = new FormGroup({
      content: new FormControl(''),
      status: new FormControl(false)
    })
    this.itemsArray.push(this.itemObject)
  }

  constructor(private activatedRoute: ActivatedRoute, private httpClient: HttpClient, private fb: FormBuilder, private router: Router, private listService: ListService) { }

  ngOnInit(): void {
    if (localStorage.hasOwnProperty('color')) {
      this.color = parseInt(<string>localStorage.getItem('color'))
    }

    this.activatedRoute.params.subscribe(params => {
      this.userId = params['id']
      this.listId = params['listId']
    })

      this.listService.getChosenList(this.userId, this.listId)
      .subscribe(value => {
        this.chosenList = value
        if (this.chosenList.user != this.userId) {
          this.router.navigate(['users', this.userId, 'lists'])
      }
        this.itemsArray = new FormArray([
        ])

        for (let i = 0; i < this.chosenList.items.length; i++) {
            this.itemObject = new FormGroup({
              id: new FormControl(this.chosenList.items[i].id),
              content: new FormControl(this.chosenList.items[i].content),
              status: new FormControl(this.chosenList.items[i].status),
            })
            this.itemsArray.push(this.itemObject)
          }

        this.listForm = new FormGroup({

          title: new FormControl(this.chosenList.title),
          user: new FormControl(this.chosenList.user),
          items: this.itemsArray,
        })
      })

  }

  goToProfile(){
    this.router.navigate(['users', this.userId])
  }

  goToLists(){
    this.router.navigate(['users', this.userId, 'lists'])
  }

  saveEdits(form: FormGroup, items: any) {
    this.listService.saveEdits(this.userId, this.listId, form).subscribe(() => {
      this.router.navigate(['users', this.userId, 'lists'])
    })
  }

  deleteItem(itemId: any, index: any){
    this.listService.deleteItem(itemId).subscribe(() => {
      this.itemsArray.removeAt(index)
    })
  }

  deleteNewItem(index: any){
    this.itemsArray.removeAt(index)
  }

  goToNotes(){
    this.router.navigate(['users', this.userId, 'notes'])
  }
}
