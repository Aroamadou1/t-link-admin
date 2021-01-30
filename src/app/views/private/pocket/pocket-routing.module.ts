import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PocketPage } from './pocket.page';

const routes: Routes = [
  {
    path: '',
    component: PocketPage,
    children:[
      {
        path: '',
        redirectTo: 'reseaux',
        pathMatch: 'full'
      },
      {
        path: 'scripts-ussd',
        loadChildren: () => import('./scripts-ussd/scripts-ussd.module').then( m => m.ScriptsUssdPageModule)
      },
      {
        path: 'reseaux',
        loadChildren: () => import('./reseaux/reseaux.module').then( m => m.ReseauxPageModule)
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PocketPageRoutingModule {}
