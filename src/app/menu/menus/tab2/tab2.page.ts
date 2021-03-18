import { Component, OnInit } from '@angular/core';
import {TransactionService} from '../../../Services/transaction.service';
import {BehaviorSubject} from 'rxjs';


@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  commisions;
  calcul;

  constructor(private transactionService: TransactionService) { }
depots = new BehaviorSubject<string>('Depot');

  ngOnInit() {

   this.depots.subscribe(datas => {
     if ( datas === 'Depot')
     {
       this.transactionService.getCommiDepot().subscribe(
         data => {
           this.commisions = data;
           this.calcul = 0;
           for (const commis of this.commisions){
             this.calcul += commis.partAgentDepot;
           }
           console.log(data);
         });
     }
     else if ( datas === 'Retrait')
     {
       this.transactionService.getCommiRetrai().subscribe(
         data => {
           this.commisions = data;
           this.calcul = 0;
           for (const commis of this.commisions){
             this.calcul += commis.partAgentRetrait;
           }
           console.log(data);
         });
     }
   });

  }


  getCommission(depot: any ){
    this.depots.next(depot);
  }




}



