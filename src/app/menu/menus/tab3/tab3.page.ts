import {Component, OnInit} from '@angular/core';
import {RetraitService} from '../../../Services/retrait.service';
import {Transactions} from '../../../Modeles/Transactions';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  mySegment = 'MesTransaction';
  transactions: Transactions[];
  constructor( private  retraitService: RetraitService) { }

  ngOnInit() {
    return this.retraitService.getTransaction().subscribe(
      data => {
        this.transactions = data;
        console.log(data);
      }
    );
  }

}
