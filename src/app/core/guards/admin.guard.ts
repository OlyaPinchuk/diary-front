import { Injectable } from '@angular/core';
import {
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
export class AdminGuard implements CanActivate {
  user: IFullUser

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.user = JSON.parse(<string>localStorage.getItem('user'))
    if (this.user.is_staff) {
      return true
    }
    else {
      this.router.navigate([''])
      return false
    }
  }
}
