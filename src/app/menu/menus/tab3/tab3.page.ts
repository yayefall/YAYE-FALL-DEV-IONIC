import {Component, OnInit} from '@angular/core';
import {Transactions} from '../../../Modeles/Transactions';
import {LoginService} from '../../../Services/login.service';
import {TransactionService} from '../../../Services/transaction.service';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  mySegment = 'MesTransaction';
  // tslint:disable-next-line:ban-types
  transactions;
  transe;
  roles;
  constructor( private  transactionService: TransactionService,
               private loginService: LoginService) { }

  ngOnInit() {
    this.roles = this.loginService.getMyToken().roles[0];

    this.transactionService.getMyTransaction().subscribe(
      data => {
        this.transactions = data;
        console.log(data);
      }
    );
  }

  getTransaction(value: any) {

  }
}
