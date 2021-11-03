import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {IList} from "../../../../interfaces";


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input()
  list: IList

  userID: number
  form: FormGroup
  listForm: FormGroup
  itemsArray: FormArray
  itemObject: FormGroup
  myGroup: FormGroup


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

  constructor(private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private httpClient: HttpClient) { }

  ngOnInit(): void {
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

  saveNewList(form: FormGroup){
    this.httpClient.post<IList>(`http://localhost:8000/api/v1/lists/add`, form.getRawValue())
      .subscribe(() => {
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
    this.httpClient.delete<IList>(`http://localhost:8000/api/v1/lists/${listId}/delete`)
      .subscribe(() => {
        this.router.navigate(['users', this.userID])
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
        // this.ngOnInit()
      })
  }

  deleteNewItem(index: any){
    this.itemsArray.removeAt(index)
  }
}

  // Example:
  //
  //
  //   <div [formGroup]="myGroup">
  //     <div formArrayName="cities">
  //       <div *ngFor="let city of cityArray.controls; index as i">
  //         <input [formControlName]="i">
  //       </div>
  //     </div>
  //   </div>
  //
  //   In your class:
  //
  //   this.cityArray = new FormArray([new FormControl('SF')]);
  //   this.myGroup = new FormGroup({
  //     cities: this.cityArray
  //   });
