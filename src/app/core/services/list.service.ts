import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IList} from "../interfaces";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private httpClient: HttpClient) { }

  getLists(userId: number, page: number) {
    return this.httpClient.get(`http://localhost:8000/api/v1/users/${userId}/lists`, {
      params: {
        pageIndex: page
      },
      observe: 'response'
    })
  }

  getChosenList(userId: number, listId: number) {
    return this.httpClient.get<IList>(`http://localhost:8000/api/v1/users/${userId}/lists/${listId}`)
  }

  deleteList(listId: number) {
    return this.httpClient.delete(`http://localhost:8000/api/v1/lists/${listId}/delete`)
  }

  changeItemStatus(itemId: number, fullItem: object) {
    return this.httpClient.put(`http://localhost:8000/api/v1/lists/items/${itemId}`, fullItem)
  }

  saveEdits(userId: number, listId: number, form: FormGroup) {
    return this.httpClient.put<IList>(`http://localhost:8000/api/v1/users/${userId}/lists/${listId}/edit`, form.getRawValue())
  }

  deleteItem(itemId: number) {
    return this.httpClient.delete(`http://localhost:8000/api/v1/lists/items/${itemId}`)
  }

  saveNewList(form: FormGroup) {
    return this.httpClient.post<IList>(`http://localhost:8000/api/v1/lists/add`, form.getRawValue())
  }

}
