import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  getUser(userId: number) {
    return this.httpClient.get(`http://localhost:8000/api/v1/users/${userId}`)
  }
}
