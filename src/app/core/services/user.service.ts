import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormGroup} from "@angular/forms";
import {IFullUser} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUser(userId: number) {
    return this.httpClient.get<IFullUser>(`http://localhost:8000/api/v1/users/${userId}`)
  }

  saveEdits(userId: number, form: FormGroup) {
    return this.httpClient.put(`http://localhost:8000/api/v1/users/${userId}/profile`, form.getRawValue())
  }
}
