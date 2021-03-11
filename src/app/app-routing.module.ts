import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {UserTabsComponent} from './menu-users/user-tabs/user-tabs.component';
import {UserTab1Component} from './menu-users/user-tabs/user-tab1/user-tab1.component';
import {UserTab2Component} from './menu-users/user-tabs/user-tab2/user-tab2.component';
import {UserTab3Component} from './menu-users/user-tabs/user-tab3/user-tab3.component';
import {MenuUsersComponent} from './menu-users/menu-users.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./menu/menus/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  /*{
    path: 'tab4',
    loadChildren: () => import('./menu/menus/tab4/tab4.module').then(m => m.Tab4PageModule)
  },*/
  {
    path: 'depot',
    loadChildren: () => import('./depot/depot.module').then( m => m.DepotPageModule)
  },
  {
    path: 'menu-users',
    component: MenuUsersComponent,
    children: [
      {
          path: '',
          component: UserTabsComponent,
        /*  children: [
            {path: 'user-tab1', redirectTo: 'user-tab1', pathMatch: 'full'},
            {path: 'user-tab1', component: UserTab1Component},
            {path: 'user-tab2', component: UserTab2Component},
            {path: 'user-tab3', component: UserTab3Component},
          ]*/
      },
      {path: 'user-tab1', redirectTo: 'user-tab1', pathMatch: 'full'},
      {path: 'user-tab1', component: UserTab1Component},
      {path: 'user-tab2', component: UserTab2Component},
      {path: 'user-tab3', component: UserTab3Component},
    ]
  },
  {
    path: 'calculateur',
    loadChildren: () => import('./calculateur/calculateur.module').then( m => m.CalculateurPageModule)
  },
  {
    path: 'retrait',
    loadChildren: () => import('./retrait/retrait.module').then( m => m.RetraitPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
