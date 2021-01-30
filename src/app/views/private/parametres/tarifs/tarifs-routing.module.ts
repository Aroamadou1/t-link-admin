import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TarifsPage } from './tarifs.page';

const routes: Routes = [
  {
    path: '',
    component: TarifsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TarifsPageRoutingModule {}
