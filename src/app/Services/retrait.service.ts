import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Transactions} from '../Modeles/Transactions';

@Injectable({
  providedIn: 'root'
})
export class RetraitService {
  private headerJson = new HttpHeaders({'Content-type': 'application/json'});
  constructor(private http: HttpClient) { }

  getTransaction(): Observable<Transactions[]> {
    return this.http.get<Transactions[]>(`${environment.apiUrl}/useragence/transactions?archivage=0`);
  }

  putRetrait(body: any){
    return this.http.put(`${environment.apiUrl}/transactions/retrait_client`,
      body, { headers : this.headerJson});
  }
  getClient(body: object): any{
    return this.http.post (`${environment.apiUrl}/transactions/client`, body);
  }
  deleteRetrait(id: any): any{
    return this.http.delete(`${environment.apiUrl}/transactions/` + id);
  }

}
