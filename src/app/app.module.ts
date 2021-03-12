import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MenuUsersComponent} from './menu-users/menu-users.component';
import {UserTab1Component} from './menu-users/user-tabs/user-tab1/user-tab1.component';
import {UserTab2Component} from './menu-users/user-tabs/user-tab2/user-tab2.component';
import {UserTab3Component} from './menu-users/user-tabs/user-tab3/user-tab3.component';
import {UserTabsComponent} from './menu-users/user-tabs/user-tabs.component';
import {JwtInterceptor} from './Helpers/jwt.interceptor';
import {ErrorInterceptor} from './Helpers/error.interceptor';

@NgModule({
    declarations: [AppComponent,
        MenuUsersComponent,
        UserTab1Component,
        UserTab2Component,
        UserTab3Component,
        UserTabsComponent
    ],
    entryComponents: [],
    imports: [BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,

    ],
    providers: [
      {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
      {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
      {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
    ],
    bootstrap: [AppComponent],
    exports: [
        UserTabsComponent
    ]
})
export class AppModule {}
