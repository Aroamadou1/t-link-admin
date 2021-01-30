import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ReloadGuard } from './guards/reload.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'public',
    pathMatch: 'full'
  },
  {
    path: 'public',
    loadChildren: () => import('./views/public/public.module').then( m => m.PublicPageModule)
  },
  {
    path: 'private',
    // canActivate: [ReloadGuard],
    loadChildren: () => import('./views/private/private.module').then( m => m.PrivatePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
