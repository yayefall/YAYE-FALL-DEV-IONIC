import { Component, OnInit } from '@angular/core';
import {DepotService} from '../../../Services/depot.service';
import {FormBuilder, Validators} from '@angular/forms';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  calcul = this.formbuilder.group({
    depot: ['', [Validators.required]],
    montant: ['', [Validators.required]],
    frais: ['', [Validators.required]],
  });

  // tslint:disable-next-line:variable-name
  max_array = [5000, 10000, 15000, 20000, 50000, 60000, 75000, 120000, 150000, 200000,
    250000, 300000, 400000, 750000, 900000, 1000000, 1125000, 1400000, 2000000];
  // tslint:disable-next-line:variable-name
  frais_array = [425, 850, 1270, 1695, 2500, 3000, 4000, 5000, 6000,
    7000, 8000, 9000, 1200, 15000, 22000, 25000, 27000, 30000, 30000];
  frais: number;

  constructor(private depotService: DepotService,
              private formbuilder: FormBuilder,
              private alertController: AlertController) { }
solde: number;


  ngOnInit() {
  }
     calculateFrais(solde: number){
       // @ts-ignore
       for (let  i = 0; i < this.max_array.length; i++)
       {
         if (solde <= this.max_array[i]) {

           this.frais =   this.frais_array[i];
          // this.total = Number (solde) + Number(this.frais);
           return this.frais;
         }
         if (solde > 2000000) {
           this.frais = solde * 0.2 ;
          // this.total = Number (solde) + Number(this.frais);
           return this.frais;
         }
       }
     }

    showFrais(){
      this.alertController.create({
        header: 'Calculateur',
        message: 'Pour une transaction de' + ' ' +
          this.calcul.value.montant + ' ' + 'le frais est  egale a' + ' ' +
          this.calcul.value.frais,

        buttons: ['retour']
      }).then(res => {

        res.present();

      });
    }
}
