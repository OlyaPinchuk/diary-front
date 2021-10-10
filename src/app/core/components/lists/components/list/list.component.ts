import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";


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
  cityArray: FormArray

  // @ts-ignore
  myGroup: FormGroup

  get cities() {
    return this.myGroup.get('cities') as FormArray
  }

  addAltEmail() {
    this.cityArray.push(this.fb.control(''))
  }

  get items(){
    return this.listForm.get('items') as FormArray
  }

  addItem() {
    this.itemsArray.push(this.fb.control(''))
  }

  constructor(private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => this.userID = params['id'])
    console.log(this.userID)

    // this.form = new FormGroup({
    //   title: new FormControl(''),
    //   user: new FormControl(''),
    //
    // })

    this.itemsArray = new FormArray([new FormControl('item')])
    this.listForm = new FormGroup({
      title: new FormControl(''),
      user: new FormControl(`${this.userID}`),
      items: this.itemsArray
    })

    // this.cityArray = new FormArray([new FormControl('SF')]);
    // this.myGroup = new FormGroup({
    //   cities: this.cityArray
    // });


  }

  saveNewList(form: FormGroup){
    console.log(form.getRawValue())
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
