import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminModel } from 'src/app/models';
import { AlertService, DataFirestoreService, FirebaseEmailAuthService } from 'src/app/services';

@Component({
  selector: 'app-private',
  templateUrl: './private.page.html',
  styleUrls: ['./private.page.scss'],
})
export class PrivatePage implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Accueil',
      url: '/private/accueil',
      icon: 'home'
    },
    {
      title: 'Activités',
      url: '/private/activites',
      icon: 'bicycle'
    },
    // {
    //   title: 'Tarifs',
    //   url: '/private/tarifs',
    //   icon: 'heart'
    // },
    {
      title: 'Equipements',
      url: '/private/equipements',
      icon: 'archive'
   },
    {
      title: 'Utilisateurs',
      url: '/private/users',
      icon: 'people'
    },
    {
      title: 'Statistiques',
      url: '/private/statistiques',
      icon: 'pie-chart'
    },
    {
      title: 'Paramètres',
      url: '/private/parametres',
      icon: 'settings'
    }
  ];

  user: { id: string, data: AdminModel };

  constructor(
    private auth: FirebaseEmailAuthService,
    private router: Router
  ) { }

  ngOnInit() {
    DataFirestoreService.user.subscribe(
      res => {
        console.log(res);
        this.user = res;
      }
    );
  }

  onLogout() {
    this.auth.logout().then(
      () => {
        this.router.navigate(['/']);
        AlertService.presentToast('Opération effectuée!', 'success');
      }, 
      err => {
        console.warn(err);
        AlertService.presentToast('Opération échouée!', 'danger');
      }
    );
  }

}
