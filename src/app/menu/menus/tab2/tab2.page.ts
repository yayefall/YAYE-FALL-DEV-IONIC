import { Component, OnInit } from '@angular/core';
import {TransactionService} from '../../../Services/transaction.service';


@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  commisions;
  calcul;

  constructor(private transactionService: TransactionService) { }

  depots = 'Depot';

  ngOnInit() {}

      getCommission(depot: any ){
       if ( depot === 'Depot')
       {
         this.transactionService.getCommiDepot().subscribe(
           data => {
             this.commisions = data;
             const  calculs = this.commisions[0].partAgentDepot;
             console.log(calculs);
           });
       }
       else if ( depot === 'Retrait')
         {
         this.transactionService.getCommiRetrai().subscribe(
           data => {
             this.commisions = data;
             console.log(data);
           });
         }

      }

}
