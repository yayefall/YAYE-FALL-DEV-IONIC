import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../../Services/login.service';
import {TransactionService} from '../../../Services/transaction.service';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  mySegment = 'MesTransaction';
  transactions;
  transaction;
  roles;
  frais: number;
  calcul: number;
  clients;
  type = new BehaviorSubject<string>('Depot');

  types = new BehaviorSubject<string>('Depot');

  constructor( private  transactionService: TransactionService,
               private loginService: LoginService) { }

  ngOnInit() {
    this.roles = this.loginService.getMyToken().roles[0];

    this.type.subscribe(value => {
      if (value === 'Depot')
      {
        this.transactionService.getMyTranD().subscribe(
          data => {
            this.transactions = data;
            this.calcul = 0;
            for (const trans of this.transactions){
              this.calcul += trans.partAgentDepot;
            }
           // console.log(data);
          }
        );
      }
      else {
        this.transactionService.getMyTranR().subscribe(
          data => {
            this.transactions = data;
            this.calcul = 0;
            for (const trans of this.transactions){
              this.calcul += trans.partAgentDepot;
            }
           // console.log(data);
          }
        );
      }
    });

    this.types.subscribe(response => {
      if (response === 'Depot')
      {
        this.transactionService.getToutTranD().subscribe(
          data => {
            this.transaction = data;
            this.clients = data;
            this.frais = 0;
            for (const trans of this.transaction){
              this.frais += trans.partAgentDepot;
            }
            console.log(this.clients);
          });
        }
      else {
        this.transactionService.getToutTranR().subscribe(
          data => {
            this.transaction = data;
            this.frais = 0;
            for (const trans of this.transaction){
              this.frais += trans.partAgentRetrait;
            }
           // console.log(data);
          });
      }
    });

  }

  getMesTransaction(values: any) {
   this.type.next(values);

  }


  getTouTransaction(val: any){
    this.types.next(val);
  }




}
