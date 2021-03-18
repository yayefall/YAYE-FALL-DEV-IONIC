import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnnulDepotPageRoutingModule } from './annul-depot-routing.module';

import { AnnulDepotPage } from './annul-depot.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AnnulDepotPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [AnnulDepotPage]
})
export class AnnulDepotPageModule {}
