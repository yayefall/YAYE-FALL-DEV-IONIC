import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private route: Router,
              private loadingCtrl: LoadingController) {}

        async show(){
          const loading = await this.loadingCtrl.create({
         message: 'wait please'
        });
          await loading.present();
          setTimeout(() => {
            loading.dismiss();
      }, 1000);
          await this.route.navigate(['/login']);
   }
}
