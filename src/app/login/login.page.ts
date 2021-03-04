import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Users} from '../Modeles/user';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../Services/login.service';
import {first} from 'rxjs/operators';

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
    private loginService: LoginService)
  {
     this.currentUser = this.loginService.currentUserValue;
  }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f(): any {
    return this.loginForm.controls;
  }

   onLogin(){
    this.submitted = true;

    this.loginService.login(this.f.username.value, this.f.password.value)
      .pipe(first()).subscribe(
        data => {
          const decodedToken = this.loginService.getMyToken();
          // console.log(decodedToken);
          if (decodedToken.roles[0] === 'ROLE_AdminAgence'){
            this.router.navigate(['/menu']);
          }else if (decodedToken.roles[0] === 'ROLE_UserAgence') {
            this.router.navigate(['/menu']);
          }else if (decodedToken.roles[0] === 'ROLE_Caissier') {
            this.router.navigate(['/depot']);
          }

          console.log(this.loginService.getMyToken());
        });
   }



}
