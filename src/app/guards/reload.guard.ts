import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataFirestoreService, FirebaseEmailAuthService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class ReloadGuard implements CanActivate {
  constructor(private router: Router, private auth: FirebaseEmailAuthService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   return this.auth.authState().toPromise().then(
     res => {
       console.log(res);
       if (res) return true;
       else this.router.navigate(['/']); 
     })
  }
  
}
