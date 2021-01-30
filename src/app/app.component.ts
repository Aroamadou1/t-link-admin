import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Platform } from '@ionic/angular';
import { ApiFirebaseService, DataFirestoreService, FCMService, FirebaseEmailAuthService } from './services';
import { Plugins } from '@capacitor/core';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
 
  constructor(
    private platform: Platform,
    private auth: FirebaseEmailAuthService,
    private api: ApiFirebaseService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.router.navigate(['/']);
      this.auth.authState().subscribe(
        user => {
          console.log(user);
          if (user){
            this.loadData(user.uid);
            this.router.navigate(['private']);
          }
        }
      )
    });
  }

  loadData(uid: string) {
    const isPushNotificationsAvailable = Capacitor.isPluginAvailable('PushNotifications');
    //fcm key
    if (isPushNotificationsAvailable) FCMService.loadKey();
    

    // auth user 
    DataFirestoreService.user = this.api.getById('admins', uid);

    //admins
    DataFirestoreService.admins = this.api.get('admins');


    //clients
    DataFirestoreService.clients = this.api.get('clients');

    //coursiers
    DataFirestoreService.coursiers = this.api.get('coursiers');

    //livraisons
    DataFirestoreService.livraisons = this.api.get('livraisons', (ref) => ref.orderBy('createdAt', 'desc').limit(10));
  
    //reseaux
    DataFirestoreService.networks = this.api.get('networks');

    //scripts
    DataFirestoreService.scripts = this.api.get('scripts');

    //categories
    DataFirestoreService.categories = this.api.get('categories');

    //poids
    DataFirestoreService.poids = this.api.get('poids');

     //distances
     DataFirestoreService.distances = this.api.get('distances');

      //tailles
    DataFirestoreService.tailles = this.api.get('tailles');
  }

  ngOnInit() {
    
  }
}
