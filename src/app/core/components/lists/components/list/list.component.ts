import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input()
  list: any

  userID: any
  // @ts-ignore
  form: FormGroup
  // @ts-ignore
  listForm: FormGroup
  // @ts-ignore
  itemsArray: FormArray

  // @ts-ignore
  myGroup: FormGroup


  get items(){
    return this.listForm.get('items') as FormArray
  }

  addItem() {
    this.itemsArray.push(this.fb.control(''))
  }

  constructor(private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => this.userID = params['id'])
    console.log(this.userID)

    this.itemsArray = new FormArray([new FormControl('item')])
    this.listForm = new FormGroup({
      title: new FormControl(''),
      user: new FormControl(`${this.userID}`),
      items: this.itemsArray
    })

  }

  saveNewList(form: FormGroup){

    let current_item: {}
    let items1 = []
    // console.log(form.getRawValue().items)
    for (let i = 0; i < form.getRawValue().items.length; i++) {
      // console.log(form.getRawValue().items[i])
      current_item = {
        content: form.getRawValue().items[i]
      }
      items1.push(current_item)
      // console.log(items1)
    }
    // console.log(items1)
    let data = form.getRawValue()
    data.items = items1
    console.log(data)

    this.httpClient.post(`http://localhost:8000/api/v1/lists/add`, data)
      .subscribe(() => {
        this.router.navigate(['users', this.userID, 'lists'])
      })

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
