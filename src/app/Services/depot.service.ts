import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepotService {

  // tslint:disable-next-line:variable-name
  max_array = [5000, 10000, 15000, 20000, 50000, 60000, 75000, 120000, 150000, 200000,
    250000, 300000, 400000, 750000, 900000, 1000000, 1125000, 1400000, 2000000];
  // tslint:disable-next-line:variable-name
  frais_array = [425, 850, 1270, 1695, 2500, 3000, 4000, 5000, 6000,
    7000, 8000, 9000, 1200, 15000, 22000, 25000, 27000, 30000, 30000];
  frais: number;
  total: number;
  private headerJson = new HttpHeaders({'Content-type': 'application/json'});
  constructor(private http: HttpClient) { }


  getFrais(solde: number){
    // @ts-ignore
    for (let  i = 0; i < this.max_array.length; i++)
    {
      if (solde <= this.max_array[i]) {

        this.frais = this.frais_array[i];
        this.total = Number (solde) + Number(this.frais);
        return this.frais;
      }
      if (solde > 2000000) {
        this.frais = solde * 0.2 ;
        this.total = Number (solde) + Number(this.frais);
        return this.frais;
      }
    }
  }
    postDepot(body: any){
        return this.http.post(`${environment.apiUrl}/transactions/client/depot`,
          body, { headers : this.headerJson});
    }

    annulDepot(body: any){
      return this.http.post (`${environment.apiUrl}/transactions/annuler`, body);
    }
}
