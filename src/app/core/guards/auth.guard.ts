import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import {IFullUser} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  userId: number
  currentId: any

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.userId = JSON.parse(<string>localStorage.getItem('user')).id
    this.currentId = route.paramMap.get('id')
    if (this.userId == this.currentId) {
      return true
    }
    else {
      this.router.navigate(['users', this.userId])
      return false
    }
  }

}
