import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActivitesPage } from './activites.page';

const routes: Routes = [
  {
    path: '',
    component: ActivitesPage,
    children: [
      {
        path: '',
        redirectTo: 'livraisons',
        pathMatch: 'full'
      },
      {
        path: 'livraisons',
        loadChildren: () => import('./livraisons/livraisons.module').then( m => m.LivraisonsPageModule)
      },
      {
        path: 'commandes',
        loadChildren: () => import('./commandes/commandes.module').then( m => m.CommandesPageModule)
      }
    ]
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivitesPageRoutingModule {}
