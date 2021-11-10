import {Component, DoCheck, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {IList} from "../../../../interfaces";
import {ListService} from "../../../../services/list.service";


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, DoCheck {

  @Input()
  list: IList
  userID: number
  form: FormGroup
  listForm: FormGroup
  itemsArray: FormArray
  itemObject: FormGroup
  viewOption: number = 0
  color: number


  // get items(){
  //   return this.listForm.get('items') as FormArray
  // }

  addItem() {
    this.itemObject = new FormGroup({
      content: new FormControl(''),
      status: new FormControl(false)
    })
    this.itemsArray.push(this.itemObject)
  }

  constructor(private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private httpClient: HttpClient, private listService: ListService) { }

  ngOnInit(): void {
    if (localStorage.hasOwnProperty('color')) {
      this.color = parseInt(<string>localStorage.getItem('color'))
    }
    this.activatedRoute.params.subscribe(params => this.userID = params['id'])

    this.itemObject = new FormGroup({
      content: new FormControl(''),
      status: new FormControl(false)
    })
    this.itemsArray = new FormArray([this.itemObject])
    this.listForm = new FormGroup({
      title: new FormControl(''),
      user: new FormControl(`${this.userID}`),
      items: this.itemsArray
    })
  }

  ngDoCheck() {
     if (localStorage.hasOwnProperty('view')) {
      this.viewOption = parseInt(<string>localStorage.getItem('view'))
      console.log(this.viewOption)
    } else if (!localStorage.hasOwnProperty('view')) {
      this.viewOption = 0
    }
  }

  saveNewList(form: FormGroup){
    this.listService.saveNewList(form).subscribe(() => {
      this.router.navigate(['users', this.userID, 'lists'])
    })
  }

  getList(listId: any){
    this.router.navigate(['users', this.userID, 'lists', listId])
  }

  editList(listId: any){
     this.router.navigate(['users', this.userID, 'lists', listId, 'edit'])
  }

  deleteList(listId: any) {
    let currentUrl = this.router.url
    console.log(currentUrl)
    this.listService.deleteList(listId).subscribe(() => {
      this.router.navigate(['users', this.userID])
      // this.router.navigate([currentUrl])
    })
  }

  changeItemStatus(itemId: any, itemContent: any, status: boolean){
    let fullItem = {
      id: itemId,
      content: itemContent,
      status: !status
    }
    this.listService.changeItemStatus(itemId, fullItem).subscribe(() => {
      })
  }

  deleteNewItem(index: any){
    this.itemsArray.removeAt(index)
  }
}
