import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators as v} from '@angular/forms';
import {regex} from "../../../constants/regex";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(private authService: AuthService, private router: Router, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [v.email, v.required]),
      password: new FormControl('', v.pattern(regex.password)),
      // is_staff: new FormControl(''),
      profile: new FormGroup({
        name: new FormControl('', [v.required, v.pattern(regex.name)]),
        surname: new FormControl('', [v.required, v.min(1), v.max(150)]),
        age: new FormControl('', [v.required, v.min(1), v.max(150)])
      })
    })

  }
  register(form: FormGroup): void {
    this.authService.register(form.getRawValue()).subscribe((response) => {
      alert('Check your email.')
      this.router.navigate(['auth', 'login']);
    }, error => {
      let msg: string = 'Error:\n'
      for (let e in error.error) {
        if (error.error[e].length) {

          let text: string = `${e} : ${error.error[e][0]}; `
          msg = msg + '\n' + text
        } else {
          for (let i in error.error[e]) {
            let text = `${i} : ${error.error[e][i][0]}; `
              msg = msg + '\n' + text
          }
        }
      }
      alert(msg)
    })

  }
}
