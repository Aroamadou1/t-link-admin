import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScriptsUssdPageRoutingModule } from './scripts-ussd-routing.module';

import { ScriptsUssdPage } from './scripts-ussd.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScriptsUssdPageRoutingModule
  ],
  declarations: [ScriptsUssdPage]
})
export class ScriptsUssdPageModule {}
