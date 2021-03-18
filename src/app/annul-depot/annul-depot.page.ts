import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {RetraitService} from '../Services/retrait.service';
import {Router} from '@angular/router';
import {DepotService} from '../Services/depot.service';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-annul-depot',
  templateUrl: './annul-depot.page.html',
  styleUrls: ['./annul-depot.page.scss'],
})
export class AnnulDepotPage implements OnInit {

  mySegment = 'Beneficiaire';
  recuperer = false;
  annul;
  code: string;

  constructor(private formbuilder: FormBuilder,
              private retraitService: RetraitService,
              private  depotService: DepotService,
              private toastController: ToastController,
              private route: Router) { }

  ngOnInit() {
  }

  getCode() {
    this.retraitService.getClient({code: this.code}).subscribe(
      data => {
        if (typeof data === 'object'){
          this.recuperer = true;
          this.annul = data;
          console.log(this.annul);
        }
        else {
          this.errorToast();
        }
      });
  }

  async errorToast() {
    const toast = await this.toastController.create({
      message: 'CE CODE EST DÉJA RETIRÉ OUBIEN IL N\'EXISTE PAS',
      duration: 3000,
      position: 'middle',
      color: 'danger'
    });
    await toast.present();
  }

  async annulToast() {
    const toast = await this.toastController.create({
      message: 'LA TRANSACTION EST SUPPRIMÉE AVEC SUCCES',
      duration: 3000,
      position: 'middle',
      color: 'success'
    });
    await toast.present();
  }


  doAnnuler(){
    const annuler = {
      code: this.code,
    };
    this.depotService.annulDepot(annuler).subscribe(
      data => {
        this.annulToast();
        this.route.navigate(['/tabs/tab1']);
      },
      (error: any) => {
        alert('veuillez saisir le code d\'abord');
      }
    );

  }



}
