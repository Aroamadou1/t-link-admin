import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReseauxPageRoutingModule } from './reseaux-routing.module';

import { ReseauxPage } from './reseaux.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReseauxPageRoutingModule
  ],
  declarations: [ReseauxPage]
})
export class ReseauxPageModule {}
