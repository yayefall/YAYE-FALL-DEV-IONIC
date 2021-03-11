import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../../Services/login.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
roles;
  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.roles = this.loginService.getMyToken().roles[0];
  }

}
