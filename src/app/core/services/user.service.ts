import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormGroup} from "@angular/forms";
import {IFullUser} from "../interfaces";
import {environment} from "../../../environments/environment";

const API_HOST = environment.API_HOST

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getAllUsers() {
    return this.httpClient.get<IFullUser[]>(`${API_HOST}/api/v1/users`)
  }

  getUser(userId: number) {
    return this.httpClient.get<IFullUser>(`${API_HOST}/api/v1/users/${userId}`)
  }

  saveEdits(userId: number, form: FormGroup) {
    return this.httpClient.patch(`${API_HOST}/api/v1/users/${userId}/profile`, form)
  }

  upgradeToAdmin(id: any) {
    return this.httpClient.patch(`${API_HOST}/api/v1/users/${id}/to_admin`, '')
  }
}
