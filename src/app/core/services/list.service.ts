import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IList} from "../interfaces";
import {FormGroup} from "@angular/forms";
import {environment} from "../../../environments/environment";

const API_HOST = environment.API_HOST

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private httpClient: HttpClient) { }

  getLists(userId: number, page: number) {
    return this.httpClient.get(`${API_HOST}/api/v1/users/${userId}/lists`, {
      params: {
        pageIndex: page
      },
      observe: 'response'
    })
  }

  getChosenList(userId: number, listId: number) {
    return this.httpClient.get<IList>(`${API_HOST}/api/v1/users/${userId}/lists/${listId}`)
  }

  deleteList(listId: number) {
    return this.httpClient.delete(`${API_HOST}/api/v1/lists/${listId}/delete`)
  }

  changeItemStatus(itemId: number, fullItem: object) {
    return this.httpClient.put(`${API_HOST}/api/v1/lists/items/${itemId}`, fullItem)
  }

  saveEdits(userId: number, listId: number, form: FormGroup) {
    return this.httpClient.put<IList>(`${API_HOST}/api/v1/users/${userId}/lists/${listId}/edit`, form.getRawValue())
  }

  deleteItem(itemId: number) {
    return this.httpClient.delete(`${API_HOST}/api/v1/lists/items/${itemId}`)
  }

  saveNewList(form: FormGroup) {
    return this.httpClient.post<IList>(`${API_HOST}/api/v1/lists/add`, form.getRawValue())
  }

}
