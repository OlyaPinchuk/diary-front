import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {FormArray, FormControl, FormGroup, FormBuilder} from "@angular/forms";
import {getSortHeaderNotContainedWithinSortError} from "@angular/material/sort/sort-errors";

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.css']
})
export class EditListComponent implements OnInit {

  userId: any
  listId: any
  chosenList: any
  // @ts-ignore
  itemsArray: FormArray
  // @ts-ignore
  itemObject: FormGroup
  // @ts-ignore
  listForm: FormGroup
  idList: any = []

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

  constructor(private activatedRoute: ActivatedRoute, private httpClient: HttpClient, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.userId = params['id']
      this.listId = params['listId']
    })

    this.httpClient.get(`http://localhost:8000/api/v1/users/${this.userId}/lists/${this.listId}`)
      .subscribe(value => {
        this.chosenList = value
        for (let i = 0; i < this.chosenList.items.length; i++) {
          this.idList.push(this.chosenList.items[i].id)
        }
        // console.log(this.idList)
        // console.log(this.chosenList)

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
          status: new FormControl(true),
          title: new FormControl(this.chosenList.title),
          user: new FormControl(this.chosenList.user),
          items: this.itemsArray,
        })
      })

  }

  saveEdits(form: FormGroup, items: any) {

    console.log(form.getRawValue())

    // let finalItems = []
    // console.log(form.getRawValue().items)
    // for (let i = 0; i < form.getRawValue().items.length; i++) {
    //   if (i >= this.idList.length){
    //     let currentItem = {
    //       content: form.getRawValue().items[i]
    //     }
    //     finalItems.push(currentItem)
    //   } else if (i <= this.idList.length) {
    //     let currentItem = {
    //       id: this.idList[i],
    //       content: form.getRawValue().items[i]
    //     }
    //     finalItems.push(currentItem)
    //   }
    //
    // }
    // let data = form.getRawValue()
    // data.items = finalItems
    //
    this.httpClient.put(`http://localhost:8000/api/v1/users/${this.userId}/lists/${this.listId}/edit`, form.getRawValue())
      .subscribe(() => {
        this.router.navigate(['users', this.userId, 'lists'])
      })

  }
}
