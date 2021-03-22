import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Users} from '../Modeles/user';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../Services/login.service';
import {first} from 'rxjs/operators';
import * as $ from 'jquery';
import {ToastController} from '@ionic/angular';

// @ts-ignore
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  returnUrl!: string;

  currentUser: Users;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private toastController: ToastController )
  {
     this.currentUser = this.loginService.currentUserValue;
  }

  ngOnInit() {


    // tslint:disable-next-line:only-arrow-functions
    $(document).ready(function() {
      // tslint:disable-next-line:only-arrow-functions
      $('#show-password ion-icon').on('click', function(event){
        event.preventDefault();
        // tslint:disable-next-line:triple-equals
        if ($ ('#show-password ion-input').attr('type') == 'text'){
          $('#show-password ion-input').attr('type', 'password');
          $('#show-password ion-icon').attr('name', 'eye-off');
        }
        // tslint:disable-next-line:triple-equals
        else if ($ ('#show-password ion-input').attr('type') == 'password'){
          $('#show-password ion-input').attr('type', 'text');
          $('#show-password ion-icon').attr('name', 'eye');
        }
      });
    });


    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  async nonAccesToast() {
    const toast = await this.toastController.create({
      message: 'VOUS N\'AVEZ PAS ACCES',
      duration: 3000,
      position: 'top',
      color: 'success'
    });
    await toast.present();
  }



  get f(): any {
    return this.loginForm.controls;
  }

   onLogin(){
    this.submitted = true;
    if (this.loginForm.invalid){
      return;
    }
    this.loginService.login(this.f.username.value, this.f.password.value)
      .pipe(first()).subscribe(
        data => {
          const decodedToken = this.loginService.getMyToken();
          // console.log(decodedToken);
          if (decodedToken.roles[0] === 'ROLE_AdminAgence' || decodedToken.roles[0] === 'ROLE_UserAgence'){
            this.router.navigate(['/menu']);

          }else{
           this.nonAccesToast();
          }
          console.log(this.loginService.getMyToken());
        });
   }




}
