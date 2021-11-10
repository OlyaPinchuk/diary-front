import {AfterViewInit, Component, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../core/services/auth.service";
import {LoginComponent} from "../../../core/components/auth/login/login.component";
import {HeaderComponent} from "../header/header.component";
import {UserComponent} from "../../../core/components/users/components/user/user.component";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, AfterViewInit {


  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {


  }

   ngAfterViewInit(): void {
   }




}
