import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScriptsUssdPage } from './scripts-ussd.page';

const routes: Routes = [
  {
    path: '',
    component: ScriptsUssdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScriptsUssdPageRoutingModule {}
