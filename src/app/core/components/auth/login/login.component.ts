import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators as v} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // @ts-ignore
  form: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [v.email, v.required]),
      password: new FormControl('', [v.required])
    });
  }

  login(form: FormGroup): void {
    this.authService.login(form.getRawValue()).subscribe(() => {
      this.router.navigate(['admin']);
    }, () => this.form.reset());
  }
}
