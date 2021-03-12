import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {CompteService} from '../../../Services/compte.service';
import {ActivatedRoute} from '@angular/router';
import {LoginService} from '../../../Services/login.service';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {
compte: any;
roles;
  constructor( private compteService: CompteService,
               private route: ActivatedRoute,
               private loginService: LoginService) {
    this.compteService.getSoldeCompte().subscribe(
      (reponse) => {
        this.compte = reponse;
       // console.log( this.compte);
      });
  }

  ngOnInit() {

    this.roles = this.loginService.getMyToken().roles[0];

   // console.log( this.roles);

    // tslint:disable-next-line:only-arrow-functions
    $(document).ready(function() {
      // tslint:disable-next-line:only-arrow-functions
      $('#container ion-icon').on('click', function(event){
        event.preventDefault();
        // tslint:disable-next-line:triple-equals
        if ($ ('#container ion-icon').attr('name') == 'eye'){
        $('#container ion-icon').attr('name', 'eye-off');
        $('#container ion-card-title').css('display', 'none');
        }
        // tslint:disable-next-line:triple-equals
        else if ($ ('#container ion-icon').attr('name') == 'eye-off'){
          $('#container ion-icon').attr('name', 'eye');
          $('#container ion-card-title').css('display', 'block');
        }
      });
    });


  }

}
