import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Items, ItemResponse } from '../../../../typings/types'

@Injectable({
  providedIn: 'root'
})
export class MlApiService {

  itemsUrl = `/api/items`;
  itemsbyIdUrl = `api/items/`

  constructor(
    private http: HttpClient
  ) { }

  searchItems( searchString: string ): Observable<Items> {
    return this.http.get<Items>( `${this.itemsUrl}?q=${searchString}` );
  }

  getItem( itemId: string | null): Observable<ItemResponse> {
    return this. http.get<ItemResponse>(`${this.itemsUrl}/${itemId}`);
  }

  getPrice( price: string): [string, string] {
    return [price.split('.')[0], price.split('.')[1]]
  }

}
