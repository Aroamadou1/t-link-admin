import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrivatePage } from './private.page';

const routes: Routes = [
  {
    path: '',
    component: PrivatePage,
    children: [
      {
        path: '',
        redirectTo: 'accueil',
        pathMatch: 'full'
      },
      {
        path: 'accueil',
        loadChildren: () => import('./accueil/accueil.module').then( m => m.AccueilPageModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then( m => m.UsersPageModule)
      },
      {
        path: 'pocket',
        loadChildren: () => import('./pocket/pocket.module').then( m => m.PocketPageModule)
      },
      {
        path: 'activites',
        loadChildren: () => import('./activites/activites.module').then( m => m.ActivitesPageModule)
      },
      {
        path: 'equipements',
        loadChildren: () => import('./equipements/equipements.module').then( m => m.EquipementsPageModule)
      },

      {
        path: 'statistiques',
        loadChildren: () => import('./statistiques/statistiques.module').then( m => m.StatistiquesPageModule)
      },
      {
        path: 'restaurants',
        loadChildren: () => import('./restaurants/restaurants.module').then( m => m.RestaurantsPageModule)
      },
      {
        path: 'parametres',
        loadChildren: () => import('./parametres/parametres.module').then( m => m.ParametresPageModule)
      }
    ]
  },
  
 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivatePageRoutingModule {}
