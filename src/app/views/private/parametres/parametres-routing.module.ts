import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParametresPage } from './parametres.page';

const routes: Routes = [
  {
    path: '',
    component: ParametresPage,
    children: [
      {
        path: '',
        redirectTo: 'tarifs',
        pathMatch: 'full'
      },
      {
        path: 'tarifs',
        loadChildren: () => import('./tarifs/tarifs.module').then( m => m.TarifsPageModule)
      },
      {
        path: 'scripts',
        loadChildren: () => import('./scripts/scripts.module').then( m => m.ScriptsPageModule)
      }
    ]
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParametresPageRoutingModule {}
