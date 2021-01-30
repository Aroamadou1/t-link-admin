import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AdminComponent } from 'src/app/components/forms/admin/admin.component';
import { ClientModel } from 'src/app/models';
import { ApiFirebaseService, DataFirestoreService, AlertService } from 'src/app/services';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
})
export class ClientsPage implements OnInit {

  data: {id: string, data: ClientModel}[];
  sub: Subscription;
  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private toastController: ToastController,
    private api: ApiFirebaseService
  ) { }

  ngOnInit() {
   this.sub =  DataFirestoreService.clients.subscribe(
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
