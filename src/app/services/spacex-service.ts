import { Injectable } from '@angular/core'
import{ HttpClient } from "@angular/common/http";
import {log} from "util";
import {tick} from "@angular/core/testing";
@Injectable({
  providedIn: 'root'
})
export class SpacexService {
  baseUrl = 'https://api.spaceXdata.com/v3/launches?limit=10';
  filters
  constructor(private http: HttpClient) {}

  getRocketList(){
    return this.http.get(this.baseUrl);
  }


  getFilteredList(payload) {
    this.filters = payload
    let uri = this.baseUrl

    for(let key in this.filters)
      uri = `${uri}&${key}=${this.filters[key]}`

    return this.http.get(uri);
  }

}
