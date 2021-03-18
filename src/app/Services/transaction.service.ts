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

  // Mes Commissions
  getCommiRetrai(){
    return this.http.get(`${environment.apiUrl}/transactions/commissRetrait`);
  }

  getCommiDepot(){
    return this.http.get(`${environment.apiUrl}/transactions/commissDepot`);
  }
 // Mes Transactions
  getMyTranD(){
    return this.http.get(`${environment.apiUrl}/transactions/mesTransDepot`);
  }
  getMyTranR(){
    return this.http.get(`${environment.apiUrl}/transactions/mesTransRetrait`);
  }

  // Toutes les transactions
  getToutTranR(){
    return this.http.get(`${environment.apiUrl}/transactions/toutTransRetrait`);
  }


  getToutTranD(){
    return this.http.get(`${environment.apiUrl}/transactions/toutTransDepot`);
  }


}
