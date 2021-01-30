import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReseauxPage } from './reseaux.page';

const routes: Routes = [
  {
    path: '',
    component: ReseauxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReseauxPageRoutingModule {}
