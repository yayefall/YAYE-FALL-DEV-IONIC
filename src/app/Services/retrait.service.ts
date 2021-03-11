import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RetraitService {
  private headerJson = new HttpHeaders({'Content-type': 'application/json'});
  constructor(private http: HttpClient) { }


  putRetrait(body: any, id: number){
    return this.http.put(`${environment.apiUrl}/transactions/client/retrait/${id}`,
      body, { headers : this.headerJson});
  }
}
