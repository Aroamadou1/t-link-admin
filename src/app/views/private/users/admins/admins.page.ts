import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AdminComponent } from 'src/app/components/forms/admin/admin.component';
import { AdminModel } from 'src/app/models';
import {  AlertService, ApiFirebaseService, DataFirestoreService } from 'src/app/services';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.page.html',
  styleUrls: ['./admins.page.scss'],
})
export class AdminsPage implements OnInit, OnDestroy {

  data: {id: string, data: AdminModel}[];
  sub: Subscription;
  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private toastController: ToastController,
    private api: ApiFirebaseService
  ) { }

  ngOnInit() {
   this.sub =  DataFirestoreService.admins.subscribe(
      res => this.data = res
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

async onAdd() {
  const modal = await this.modalController.create({
  component: AdminComponent
  });
  await modal.present();
}

async onEdit(id: string) {
  const modal = await this.modalController.create({
  component: AdminComponent,
  componentProps: { id }
  });
  await modal.present();
}


async onShow(id: string) {
  const modal = await this.modalController.create({
  component: AdminComponent,
  componentProps: { id }
  });
  await modal.present();
}

  async onDelete(id: string) {
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
            console.log('Confirm Okay');
           this.api.delete('admins', id).then(
             () => {
              AlertService.presentToast('Opération effectuée!', 'success')
             },
             err => {
              AlertService.presentToast('Opération échouée!', 'danger')
             }
           );
          }
        }
      ]
    });
  
    await alert.present();
  }
 
}
