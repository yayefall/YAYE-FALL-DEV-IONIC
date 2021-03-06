import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {RetraitService} from '../Services/retrait.service';
import { Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
@Component({
  selector: 'app-retrait',
  templateUrl: './retrait.page.html',
  styleUrls: ['./retrait.page.scss'],
})
export class RetraitPage implements OnInit {
  mySegment = 'Beneficiaire';
  retrait = false;
  retire;
  code: string;

  formRetrait = this.formbuilder.group({
    CNIBeneficiaire: ['', [Validators.required]],
  });
  constructor(private formbuilder: FormBuilder,
              private retraitService: RetraitService,
              private route: Router,
              private toastController: ToastController) { }

  ngOnInit() {
  }

  getCode() {
    this.retraitService.getClient({code: this.code}).subscribe(
      data => {
        if (typeof data === 'object'){
          this.retrait = true;
          this.retire = data;
          console.log(this.retire);
        }
        else {
         this.errorToast();
        }

      });
  }


  async errorToast() {
    const toast = await this.toastController.create({
      message: 'CE CODE  N\'EXISTE PAS',
      duration: 3000,
      position: 'middle',
      color: 'danger'
    });
    await toast.present();
  }

  async retraitToast() {
    const toast = await this.toastController.create({
      message: 'LA TRANSACTION EST RETIRÉE AVEC SUCCESS',
      duration: 3000,
      position: 'top',
      color: 'success'
    });
    await toast.present();
  }

  doRetrait(){
    const retrais = {
      code: this.code,
      CNIBeneficiaire: this.formRetrait.controls.CNIBeneficiaire.value
    };
    this.retraitService.putRetrait(retrais).subscribe(
      data => {
        this.retraitToast();
        this.route.navigate(['/tabs/tab1']);
      },
      (error: any) => {
        alert('veuillez saisir le code d\'abord');
        console.log(error);
      }
  );

  }

}
