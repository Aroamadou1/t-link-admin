import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EquipementsPage } from './equipements.page';

const routes: Routes = [
  {
    path: '',
    component: EquipementsPage,
    children: [
      {
        path: '',
        redirectTo: 'engins',
        pathMatch: 'full'
      },
      {
        path: 'engins',
        loadChildren: () => import('./engins/engins.module').then( m => m.EnginsPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquipementsPageRoutingModule {}
