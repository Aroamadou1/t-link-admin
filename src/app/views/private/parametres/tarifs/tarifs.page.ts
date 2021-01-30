import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AlertService, ApiFirebaseService, DataFirestoreService } from 'src/app/services';

@Component({
  selector: 'app-tarifs',
  templateUrl: './tarifs.page.html',
  styleUrls: ['./tarifs.page.scss'],
})
export class TarifsPage implements OnInit, OnDestroy {

  newCat: any;
  newPoids: any;
  categories = [];
  poids = [];
  tailles = [];
  distances = [];
  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  sub4: Subscription;
  
  constructor(
    private api: ApiFirebaseService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.sub1 =  DataFirestoreService.poids.subscribe(
      res => this.poids = res
    );
    this.sub2 =  DataFirestoreService.tailles.subscribe(
      res => this.tailles = res
    );
    this.sub3 =  DataFirestoreService.distances.subscribe(
      res => this.distances = res
    );
    this.sub4 =  DataFirestoreService.categories.subscribe(
      res => this.categories = res
    ); 
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
    this.sub4.unsubscribe();
  }

  setNewcatategorie(){
    this.newCat = {nom: "", montant: null};
  }
  onAddCategorie() {
    this.api.post('categories', this.newCat).then(
      res => {
        AlertService.presentToast('Opération effectuée!', 'success');
        this.setNewcatategorie();
      }, 
      err => {
        console.warn(err);
        AlertService.presentToast('Opération échouée!', 'danger');
      }
    );
  }

  onUpdateCategorie(id: string, data: any) {
    this.api.put('categories', id, data).then(
      res => {
        AlertService.presentToast('Opération effectuée!', 'success');
      }, 
      err => {
        console.warn(err);
        AlertService.presentToast('Opération échouée!', 'danger');
      }
    );
  }

  async onDeleteCategorie(id: string) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.api.delete('categories', id).then(
              res => {
                AlertService.presentToast('Opération effectuée!', 'success');
              }, 
              err => {
                console.warn(err);
                AlertService.presentToast('Opération échouée!', 'danger');
              }
            );
          }
        }
      ]
    });
  
    await alert.present();
  }

  setNewPoids(){
    this.newPoids = {borneInf: null, borneSup: null, montant: null};
  }
  onAddPoids() {
    this.api.post('poids', this.newPoids).then(
      res => {
        AlertService.presentToast('Opération effectuée!', 'success');
        this.setNewPoids();
      }, 
      err => {
        console.warn(err);
        AlertService.presentToast('Opération échouée!', 'danger');
      }
    );
  }

  onUpdatePoids(id: string, data: any) {
    this.api.put('poids', id, data).then(
      res => {
        AlertService.presentToast('Opération effectuée!', 'success');
      }, 
      err => {
        console.warn(err);
        AlertService.presentToast('Opération échouée!', 'danger');
      }
    );
  }

  async onDeletePoids(id: string) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.api.delete('poids', id).then(
              res => {
                AlertService.presentToast('Opération effectuée!', 'success');
              }, 
              err => {
                console.warn(err);
                AlertService.presentToast('Opération échouée!', 'danger');
              }
            );
          }
        }
      ]
    });
  
    await alert.present();
  }

}
