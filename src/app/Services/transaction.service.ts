import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Transactions} from '../Modeles/Transactions';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }



  getAllTransaction(): Observable<Transactions[]> {
    return this.http.get<Transactions[]>(`${environment.apiUrl}/useragence/transactions?archivage=0`);
  }

  getCommiRetrai(){
    return this.http.get(`${environment.apiUrl}/transactions/commissRetrait`);
  }

  getCommiDepot(){
    return this.http.get(`${environment.apiUrl}/transactions/commissDepot`);
  }

  getMyTransaction(){
    return this.http.get(`${environment.apiUrl}/transactions/mesTransactions`);
  }

}
