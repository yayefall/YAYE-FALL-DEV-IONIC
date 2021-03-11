import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {DepotService} from '../Services/depot.service';
import {Client} from '../Modeles/Client';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-depot',
  templateUrl: './depot.page.html',
  styleUrls: ['./depot.page.scss'],
})
export class DepotPage implements OnInit {
mySegment = 'Emetteur';
  // tslint:disable-next-line:variable-name
  max_array = [5000, 10000, 15000, 20000, 50000, 60000, 75000, 120000, 150000, 200000,
    250000, 300000, 400000, 750000, 900000, 1000000, 1125000, 1400000, 2000000];
  // tslint:disable-next-line:variable-name
  frais_array = [425, 850, 1270, 1695, 2500, 3000, 4000, 5000, 6000,
    7000, 8000, 9000, 1200, 15000, 22000, 25000, 27000, 30000, 30000];
frais: number;
total: number;
client: Client;
  constructor(private formbuilder: FormBuilder,
              private  depotService: DepotService,
              public alertController: AlertController) {}

  depot = this.formbuilder.group({
    CNIClient: ['', [Validators.required]],
    nomClient: ['', [Validators.required]],
    telephoneClient: ['', [Validators.required]],
    nomBeneficiaire: ['', [Validators.required]],
    telephoneBeneficiaire: ['', [Validators.required]],
    montant: ['', [Validators.required]],
  });


  ngOnInit() {
  }
    get d(){

        return this.depot.controls;
    }
  getFrais(solde: number){
    // @ts-ignore
       for (let  i = 0; i < this.max_array.length; i++)
       {
         if (solde <= this.max_array[i]) {

        this.frais =   this.frais_array[i];
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


  showAlerts() {
    this.alertController.create({
      header: 'Transfert Reussi',
      cssClass: 'color',
      message: 'Vous avez envoyé à',
      inputs: [
        {
          name: 'nomBeneficiaire',
          placeholder: 'Eg.NY',
          label: 'nomBeneficiaire',
          value: this.depot.value.nomBeneficiaire
        },
        {
          name: 'montant',
          placeholder: 'Eg.NY',
          label: 'montant',
          value: this.depot.value.montant
        },
        {
          name: 'code',
          placeholder: 'Eg.NY',
          label: 'code',
          value: this.depot.value.code
        },
      ],

      buttons: [
        {
          text: 'retour',
        },
        {
          text: 'envoyer',
        }
      ]
    }).then(res => {

      res.present();

    });

  }
   async onSubmit() {
     const infoClient = {
        montant: this.d.montant.value,
        clients: {
          nomClient: this.d.nomClient.value,
          telephoneClient: this.d.telephoneClient.value,
          CNIClient: this.d.CNIClient.value,
          nomBeneficiaire: this.d.nomBeneficiaire.value,
          telephoneBeneficiaire: this.d.telephoneBeneficiaire.value,
        }
      };
     const alert = await this.alertController.create({
        header: 'Confirmation',
        inputs: [
          {
            name: 'CNIClient',
            placeholder: 'Eg.NY',
            label: 'Numero CNI',
            value: this.depot.value.CNIClient

          },
          {
            name: 'nomClient',
            placeholder: 'Eg.NY',
            label: 'EMETTEUR',
            value: this.depot.value.nomClient

          },
          {
            name: 'telephoneClient',
            placeholder: 'Eg.NY',
            label: 'TELEPHONE',
            value: this.depot.value.telephoneClient

          },
          {
            name: 'montant',
            placeholder: 'Eg.NY',
            label: 'MONTANT A ENVOYER',
            value: this.depot.value.montant

          },
          {
            name: 'nomBeneficiaire',
            placeholder: 'Eg.NY',
            label: 'RECEPTEUR',
            value: this.depot.value.nomBeneficiaire

          },
          {
            name: 'telephoneBeneficiaire',
            placeholder: 'Eg.NY',
            label: 'TELEPHONE',
            value: this.depot.value.telephoneBeneficiaire

          },
        ],
        buttons: [
          {
            text: 'Annuler',
            handler: (data: any) => {
              console.log('Canceled', data);
            }
          },
          {
            text: 'Confirmer!',
            handler: () => {
              this.depotService.postDepot(infoClient).subscribe(
                async (data: any) => {
                  console.log(data);
                  this.showAlerts();
                });
            }
          }
        ]
      });
     await alert.present();
    }
}
