import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersPage } from './users.page';

const routes: Routes = [
  {
    path: '',
    component: UsersPage,
    children: [
      {
        path: '',
        redirectTo: 'admins',
        pathMatch: 'full'
      },
      {
        path: 'admins',
        loadChildren: () => import('./admins/admins.module').then( m => m.AdminsPageModule)
      },
      {
        path: 'clients',
        loadChildren: () => import('./clients/clients.module').then( m => m.ClientsPageModule)
      },
      {
        path: 'coursiers',
        loadChildren: () => import('./coursiers/coursiers.module').then( m => m.CoursiersPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersPageRoutingModule {}
