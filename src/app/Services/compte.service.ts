import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Compte} from '../Modeles/Compte';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompteService {
  private headerJson = new HttpHeaders({'Content-type': 'application/json'});
  constructor(private  http: HttpClient) { }

  getCompte(): Observable<Compte[]> {
    return this.http.get<Compte[]>(`${environment.apiUrl}/adminsysteme/comptes?archivage=0`);
  }

  getSoldeCompte(): any{
    return this.http.get (`${environment.apiUrl}/adminagence/compte`).pipe(map(
      data => {
        return data;
      }
    ));
  }
}
