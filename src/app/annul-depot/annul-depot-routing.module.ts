import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnnulDepotPage } from './annul-depot.page';

const routes: Routes = [
  {
    path: '',
    component: AnnulDepotPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnnulDepotPageRoutingModule {}
